import { useRoute, createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import uniq from 'lodash/uniq';

import baseRouters from './modules/base';
import componentsRouters from './modules/components';
import othersRouters from './modules/others';
import businessRouters from './modules/business';
import manageRouters from './modules/system';
// 关于单层路由， meta 中设置
// { single: true } 即可为单层路由，
// { hidden: true } 即可在侧边栏隐藏该路由

// 存放动态路由
export const asyncRouterList: Array<RouteRecordRaw> = [
  ...baseRouters,
  ...componentsRouters,
  ...othersRouters,
  ...businessRouters,
  ...manageRouters,
];

// 存放固定的路由
const defaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/production', // TODO：默认地址待处理
    component: () => import('@/layouts/blank.vue'),
  },
  {
    path: '/:w+',
    name: '404Page',
    redirect: '/result/404',
  },
];

export const allRoutes = [...defaultRouterList, ...asyncRouterList];

export const getRoutesExpanded = () => {
  const expandedRoutes = [];

  allRoutes.forEach((item) => {
    if (item.meta && item.meta.expanded) {
      expandedRoutes.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      item.children
        .filter((child) => child.meta && child.meta.expanded)
        .forEach((child: RouteRecordRaw) => {
          expandedRoutes.push(item.path);
          expandedRoutes.push(`${item.path}/${child.path}`);
        });
    }
  });
  return uniq(expandedRoutes);
};

export const getActive = (maxLevel = 3): string => {
  const route = useRoute();
  if (!route.path) {
    return '';
  }
  return route.path
    .split('/')
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join('');
};

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
