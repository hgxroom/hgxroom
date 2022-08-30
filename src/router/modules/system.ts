import Layout from '@/layouts';
import Ecosystem from '@/assets/icons/ecosystem.svg';

export default [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/account',
    meta: { title: '系统管理', icon: Ecosystem },
    children: [
      {
        path: 'account',
        name: 'ManageAccount',
        component: () => import('@/pages/system/manage-account/index.vue'),
        meta: { title: '账号管理' },
      },
    ],
  },
];
