import request from '@/utils/request';

export function getAllVatCode() {
  return request({
    url: '/xiyou-digital-server/order/board/getAllNow',
    method: 'POST',
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
