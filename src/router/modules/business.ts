import Layout from '@/layouts';

export default [
  {
    path: '/data',
    name: 'data',
    component: Layout,
    redirect: '/data/process',
    meta: { title: '资料管理', icon: 'file' },
    children: [
      {
        path: 'process',
        name: 'Process',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '工序' },
      },
      {
        path: 'workshop',
        name: 'Workshop',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '车间' },
      },
      {
        path: 'equipment-type',
        name: 'EquipmentType',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '设备类型' },
      },
      {
        path: 'equipment-information',
        name: 'EquipmentInformation',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '设备信息' },
      },
    ],
  },
  {
    path: '/production',
    name: 'production',
    component: Layout,
    redirect: '/production/order-list',
    meta: { title: '生产管理', icon: 'view-module' },
    children: [
      {
        path: 'order-list',
        name: 'Orderlist',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '染色订单' },
      },
    ],
  },
];
