// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

import PhHouseLine from '~icons/ph/house-line';
import PhUserCircleGear from '~icons/ph/user-circle-gear';
import PhBuildings from '~icons/ph/buildings';

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
    {
      path: 'usuarios',
      name: 'Usuarios',
      meta: {
        title: 'Usuarios',
        icon: PhUserCircleGear,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
        roles: ['admin'],
      },
      component: () => import('@/pages/admin/usuarios.page.vue'),
    },
    {
      path: 'areas',
      name: 'Areas',
      meta: {
        title: 'Areas',
        icon: PhBuildings,
        // elSvgIcon: '',
        hidden: false,
        auth: true,
        roles: ['admin'],
      },
      component: () => import('@/pages/admin/areas.page.vue'),
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
