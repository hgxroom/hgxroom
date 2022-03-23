import { AxiosPromise } from 'axios';
import qs from 'qs';
import request from '@/utils/request';

/**
 * 获取设备列表,表格使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceInfoListGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  const qsData = qs.stringify(data);
  return request({
    url: `/xiyou-digital-server/device/list?${qsData}`,
    method: 'POST',
  });
}
/**
 * 设备列表数据删除
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceInfoListDel(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/device/del`,
    method: 'DELETE',
    data,
  });
}
/**
 * 编辑或者新增设备列表数据
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceInfoListAddOrUpdate(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/device/submit`,
    method: 'POST',
    data,
  });
}
