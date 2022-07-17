import { defineStore } from 'pinia';
import useAuthApi from '@/api/modules/auth';
import useUserApi from '@/api/modules/user';
import router from '@/router';
import { Usuario } from '@/api/types';
import { ApiRol } from '@/types';

interface Auth {
  user?: Usuario;
  token?: string;
  isLoggedIn: boolean;
}
export const AUTH_STORE_KEY = 'auth_store';
const useAuth = defineStore({
  // id de estado
  id: AUTH_STORE_KEY,
  state: (): Auth => {
    return {
      user: undefined,
      token: undefined,
      isLoggedIn: false,
    };
  },
  // getters del estado
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    islogged: (state) => state.isLoggedIn,
  },
  // pinia mutations actions
  actions: {
    isTecnico() {
      return this.user?.rol === ApiRol.tecnico;
    },
    // actions async tipo de tema
    async login(usuario: string, password: string): Promise<boolean> {
      // process login
      const authApi = useAuthApi();
      const isLogin = await authApi
        .login({ usuario, password })
        .then((resp) => {
          this.user = resp.data.usuario;
          this.token = resp.data.token;
          this.isLoggedIn = true;
          return true;
        })
        .catch(() => {
          return false;
        });
      return isLogin;
    },
    async refreshMe(): Promise<boolean> {
      // process login
      const authApi = useAuthApi();
      const isLogin = await authApi
        .me()
        .then((resp: { data: Usuario }) => {
          console.log('refresh me: ', resp);
          if (this.user) {
            const userInfo: Usuario = { ...this.user };
            Object.assign(userInfo, resp.data);
            this.user = userInfo;
          }
          this.isLoggedIn = true;
          return true;
        })
        .catch(() => {
          return false;
        });
      return isLogin;
    },
    logout() {
      this.user = undefined;
      this.token = undefined;
      this.isLoggedIn = false;
      router.push('/login');
    },
    //
    async getCantUsers(): Promise<number> {
      const userApi = useUserApi();
      let cantUsers = -1;
      await userApi.count({}).then(({ data }: { data: { count: number } }) => {
        cantUsers = data.count;
      });
      return cantUsers;
    },
  },
});

export default useAuth;
