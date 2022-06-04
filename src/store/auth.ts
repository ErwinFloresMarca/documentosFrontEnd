import { defineStore } from 'pinia';

interface User {
  id: number;
  usuario: string;
  nombres: string;
  email?: string;
  paterno?: string;
  materno: string;
  ci: string;
  role: string;
}

interface Auth {
  user?: User;
  token?: string;
  isLoggedIn: boolean;
}
export const STORE_KEY = 'auth_store';
const useAuth = defineStore({
  // id de estado
  id: STORE_KEY,
  state: (): Auth => {
    return {
      user: undefined,
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
      this.user = {
        id: 1,
        usuario: 'erwin.flores',
        nombres: 'Erwin Ramiro',
        paterno: 'Flores',
        materno: 'Marca',
        role: 'Amin',
        ci: '10529939',
        email: 'ramiromarca6@gmail.com',
      };
      this.token = 'some token';
      this.isLoggedIn = true;
      return true;
    },
    logout() {
      const router = useRouter();
      this.user = undefined;
      this.token = undefined;
      this.isLoggedIn = false;
      router.push('/login');
    },
  },
});

export default useAuth;
