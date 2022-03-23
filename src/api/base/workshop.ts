import { AxiosPromise } from 'axios';
import qs from 'qs';
import request from '@/utils/request';

/**
 * 获取所有的车间列表,下拉框使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function selectWorkshopGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/workshop/getAll`,
    method: 'POST',
    data,
  });
}
/**
 * 获取车间列表,表格使用
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function workshopListGet(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  const qsData = qs.stringify(data);
  return request({
    url: `/xiyou-digital-server/workshop/list?${qsData}`,
    method: 'POST',
  });
}
/**
 * 车间列表数据删除
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function workshopListDel(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/workshop/del`,
    method: 'DELETE',
    data,
  });
}
/**
 * 编辑或者新增车间列表数据
 * @param {Objeect} params
 * @returns {promise} axios promise
 */
export function workshopListAddOrUpdate(params: object): AxiosPromise<any> {
  const data = {
    ...params,
  };
  return request({
    url: `/xiyou-digital-server/workshop/submit`,
    method: 'POST',
    data,
  });
}
