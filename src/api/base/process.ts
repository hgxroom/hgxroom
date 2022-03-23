import { AxiosPromise } from 'axios';
import qs from 'qs';
import request from '@/utils/request';

/**
 * 获取所有的工序工段列表,下拉框使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function selectProcessGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/procedure/getAll`,
    method: 'POST',
    data,
  });
}
/**
 * 获取工序工段列表,表格使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function processListGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  const qsData = qs.stringify(data);
  return request({
    url: `/xiyou-digital-server/procedure/list?${qsData}`,
    method: 'POST',
  });
}
/**
 * 工序工段列表数据删除
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function processListDel(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/procedure/del`,
    method: 'DELETE',
    data,
  });
}
/**
 * 编辑或者新增工序工段列表数据
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function processListAddOrUpdate(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/procedure/submit`,
    method: 'POST',
    data,
  });
}
