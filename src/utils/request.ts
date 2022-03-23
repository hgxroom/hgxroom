import axios from 'axios';
import { getToken } from '@/utils/auth';
import proxy from '../config/proxy';

const env = import.meta.env.MODE || 'development';

const host = env === 'mock' ? '/' : proxy[env].host; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001,
};

/** 请求队列 */
const pendingRequest = new Map();
/** 生成请求key */
function generateRequestKey(config) {
  // const { method, url, params, data } = config
  // const key = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  // 不考虑携带参数
  const { method, url } = config;
  const key = [method, url].join('&');
  return key;
}
/** 添加请求信息到队列 */
function addPendingRequest(config, list) {
  const requestKey = generateRequestKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!list.has(requestKey)) {
        list.set(requestKey, cancel);
      }
    });
}
/** 检查是否存在重复请求，若存在则取消已发的请求 */
function removePendingRequest(config, list) {
  const requestKey = generateRequestKey(config);
  if (list.has(requestKey)) {
    const cancelToken = list.get(requestKey);
    cancelToken(requestKey); // 把接口信息传下去，方便溯源，不影响取消
    list.delete(requestKey);
  }
}

const instance = axios.create({
  baseURL: host,
  timeout: 20000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    removePendingRequest(config, pendingRequest); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config, pendingRequest); // 把当前请求添加到pendingRequest对象中

    // 为每个请求都携带token  [`Token`]为自定义key，可以更改
    const token = getToken();
    if (token) {
      config.headers.user_token = `${token}`;
    }
    // 请求类型处理
    const method = config.method.toLowerCase();
    switch (method) {
      case 'get':
        break;
      case 'post':
        break;
      case 'formdata': {
        // 上传文件特殊处理
        const a = config.data;
        const formData = new FormData();

        for (const i in a) {
          if (Object.hasOwnProperty.call(a, i)) {
            const element = a[i];
            formData.append(i, element);
          }
        }
        config.data = formData;
        config.timeout = 100000;
        config.headers['Content-Type'] = 'multipart/form-data';
        config.method = 'post';
        break;
      }
      default:
        break;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }
    }
    return response;
  },
  (err) => {
    const { config } = err;

    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  },
);

export default instance;
