// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import LoginComponent from '@/pages/login.page.vue';
import SignUpComponent from '@/pages/sign-up-admin.page.vue';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
  {
    path: '/sign-up-admin',
    name: 'SignUp',
    component: SignUpComponent,
  },
];

export default commonRoutes;
