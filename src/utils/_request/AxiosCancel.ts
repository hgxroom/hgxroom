import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import _ from 'lodash';

/** 存储请求与取消令牌的键值对列表 */
let pendingRequestMap = new Map<string, Canceler>();

/** 生成请求key */
const generateRequestKey = (config: AxiosRequestConfig) => {
  // 考虑携带参数
  // const { method, url, params, data } = config
  // const key = [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
  // 不考虑携带参数
  const { method, url } = config;
  const key = [method, url].join('&');
  return key;
};

export class AxiosCanceler {
  /** 添加请求信息到队列 */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const requestKey = generateRequestKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingRequestMap.has(requestKey)) {
          // 如果当前没有相同请求就添加
          pendingRequestMap.set(requestKey, cancel);
        }
      });
  }

  /** 检查是否存在重复请求，若存在则取消已发的请求 */
  removePending(config: AxiosRequestConfig) {
    const requestKey = generateRequestKey(config);
    if (pendingRequestMap.has(requestKey)) {
      const cancel = pendingRequestMap.get(requestKey);
      cancel(requestKey);
      pendingRequestMap.delete(requestKey);
    }
  }

  /** 清空所有请求 */
  removeAllPending() {
    pendingRequestMap.forEach((cancel) => {
      if (cancel && _.isFunction(cancel)) {
        cancel();
      }
    });
    pendingRequestMap.clear();
  }

  reset() {
    pendingRequestMap = new Map<string, Canceler>();
  }
}
