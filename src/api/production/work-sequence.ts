import request from '@/utils/request';

export function getWorkSequence(data) {
  return request({
    url: '/xiyou-digital-server/productionProcesses/list',
    method: 'POST',
    data,
  });
}
