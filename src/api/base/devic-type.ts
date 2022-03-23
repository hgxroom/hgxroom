import { AxiosPromise } from 'axios';
import qs from 'qs';
import request from '@/utils/request';

/**
 * 获取所有的设备类型列表,下拉框使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function selectDeviceTypeGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/type/getAll`,
    method: 'POST',
    data,
  });
}
/**
 * 获取设备类型列表,表格使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceTypeListGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  const qsData = qs.stringify(data);
  return request({
    url: `/xiyou-digital-server/type/list?${qsData}`,
    method: 'POST',
  });
}
/**
 * 设备类型列表数据删除
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceTypeListDel(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/type/del`,
    method: 'DELETE',
    data,
  });
}
/**
 * 编辑或者新增设备类型列表数据
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function deviceTypeListAddOrUpdate(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/type/submit`,
    method: 'POST',
    data,
  });
}
