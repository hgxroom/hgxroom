import request from '@/utils/request';

/**
 * 获取用户账号列表
 * @param data
 * @returns
 */
export function getAccoutnLists(data) {
  return request({
    url: '/xiyou-digital-server/sysUser/findAll',
    method: 'POST',
    data,
  });
}
