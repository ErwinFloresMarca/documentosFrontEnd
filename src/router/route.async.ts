// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

import PhHouseLine from '~icons/ph/house-line';

export const adminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'Admin',
  redirect: '/admin/home',
  meta: {
    title: 'Admin',
    // phIcon: '',
    elSvgIcon: 'Tools',
  },
  component: () => import('@/layouts/admin/index.vue'),
  children: [
    {
      path: 'home',
      name: 'Home',
      meta: {
        title: 'Home',
        icon: PhHouseLine,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
      },
      component: () => import('@/pages/admin/home.page.vue'),
    },
  ],
};

const asyncRoutes: Array<RouteRecordRaw> = [
  adminRoute,
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: {
  //     title: '',
  //     icon: '',
  //   },
  //   component: () => import('@/views/home/index.vue'),
  // },
  // {
  //   path: '/process',
  //   name: 'process',
  //   meta: {
  //     title: 'Template configuration process',
  //     icon: '',
  //   },
  //   component: () => import('@/views/example/MarkdownPage.vue'),
  // },
];

export default asyncRoutes;
