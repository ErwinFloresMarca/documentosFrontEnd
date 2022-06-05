// 跟鉴权无关的特殊路由
import { RouteRecordRaw } from 'vue-router';

const exceptionRoutes: Array<RouteRecordRaw> = [
  {
    path: '/401',
    name: '401',
    meta: {
      title: 'No Autorizado',
    },
    component: () => import('@/views/exception/401.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: 'No Encontrado',
    },
    component: () => import('@/views/exception/notFound.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    meta: {},
    redirect: '/404',
  },
];

export default exceptionRoutes;
