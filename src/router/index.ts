import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import exceptionRoutes from '@/router/route.exception';
import asyncRoutes from '@/router/route.async';
import commonRoutes from '@/router/route.common';

import useAuth from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  // rutas estáticas
  ...commonRoutes,
  // rutas asíncronas
  ...asyncRoutes,
  // rutas de excepción
  ...exceptionRoutes,
];

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
});

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  const auth = useAuth();
  if (auth.islogged) {
    if (to.meta.roles) {
      // logica de roles
    }
    if (to.name === 'Login') {
      next('/admin/home');
      return;
    }
    next();
    return;
  }
  if (to.meta.auth) {
    next('/login');
    return;
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
