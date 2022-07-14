import request from '@/utils/request';

export function getAllVatCode(data = { page: 1, size: 30 }) {
  return request({
    url: '/xiyou-digital-server/order/board/getAllNow',
    method: 'POST',
    data,
  });
}

type infoParams = {
  orderId: number;
  procedureId: number;
};
export function getBoardListInfo(data: infoParams) {
  return request({
    url: '/xiyou-digital-server/order/board/getListInfo',
    method: 'POST',
    data,
  });
}
