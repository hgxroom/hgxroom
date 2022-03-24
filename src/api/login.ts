import { AxiosPromise } from 'axios';
import qs from 'qs';
import request from '@/utils/request';
/**
 * 登录
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function login(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/login`,
    method: 'POST',
    data,
  });
}
