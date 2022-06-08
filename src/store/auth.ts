import { defineStore } from 'pinia';
import useAuthApi from '@/api/modules/auth';

interface User {
  id: number;
  usuario: string;
  nombres: string;
  email?: string;
  paterno?: string;
  materno: string;
  ci: string;
  rol: string;
  avatar?: string;
}

interface Auth {
  user?: User;
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
    // actions async tipo de tema
    async login(usuario: string, password: string): Promise<boolean> {
      // process login
      const authApi = useAuthApi();
      console.log(usuario, password);
      const isLogin = await authApi
        .login({ usuario, password })
        .then((resp) => {
          console.log('inicio de sesion: ', resp.data);
          this.user = resp.data.usuario;
          this.token = resp.data.token;
          this.isLoggedIn = true;
          return true;
        })
        .catch((err) => {
          console.log('error de login: ', err);
          return false;
        });
      return isLogin;
    },
    logout() {
      this.user = undefined;
      this.token = undefined;
      this.isLoggedIn = false;
    },
  },
});

export default useAuth;
