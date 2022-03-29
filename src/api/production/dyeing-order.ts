import request from '@/utils/request';

/** 获取染色订单列表 */
export function getOrderList(params: object) {
  const data = {
    ...params,
  };

  return request({
    url: `/xiyou-digital-server/order/list`,
    method: 'POST',
    data,
  });
}

export function getOrderInfo(params: object) {
  return request({
    url: `/xiyou-digital-server/order/info`,
    method: 'GET',
    params,
  });
}

export function getInfoProcess(id: number) {
  return request({
    url: `/xiyou-digital-server/order/board/process`,
    method: 'POST',
    params: { orderId: id },
  });
}

/** 获取备胚列表 */
export function getFabricsList(id: number) {
  return request({
    url: `/xiyou-digital-server/order/spare/fabrics`,
    method: 'GET',
    params: { orderId: id },
  });
}

/** 录入布匹标签 */
export function enterLabel(params) {
  return request({
    url: `/xiyou-digital-server/order/spare/fabrics/bind`,
    method: 'POST',
    data: params,
  });
}

/** 改变订单状态 手动入库 */
export function updateStatus(id) {
  return request({
    url: `/xiyou-digital-server/order/updateStatus`,
    method: 'PUT',
    data: { id },
  });
}
