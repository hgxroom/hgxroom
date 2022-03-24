import request from '@/utils/request';
/**
 * 登录
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function login(params: object) {
  const data = {
    ...params,
  };

  return request({
    url: `/xiyou-digital-server/login`,
    method: 'POST',
    data,
  });
}

/**
 * 获取用户信息
 * @returns {promise} axios promise
 */
export function getInfo() {
  return request({
    url: `/xiyou-digital-server/getInfo`,
    method: 'GET',
  });
}
