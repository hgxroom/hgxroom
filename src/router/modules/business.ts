import Layout from '@/layouts';

export default [
  {
    path: '/production',
    name: 'production',
    component: Layout,
    redirect: '/production/order-list',
    meta: { title: '生产管理', icon: 'view-module' },
    children: [
      {
        path: 'order-list',
        name: 'listBase',
        component: () => import('@/pages/production/dyeing-order/index.vue'),
        meta: { title: '染色订单' },
      },
    ],
  },
];
