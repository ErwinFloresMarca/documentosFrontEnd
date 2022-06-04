// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import LoginComponent from '@/views/auth/login.vue';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
];

export default commonRoutes;
