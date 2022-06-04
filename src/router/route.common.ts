// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import LoginComponent from '@/pages/login.page.vue';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
];

export default commonRoutes;
