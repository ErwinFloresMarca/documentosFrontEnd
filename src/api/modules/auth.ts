import useService from '@/api/http';

const useAuthApi = () => {
  const service = useService();
  return {
    login: (data: { usuario: string; password: string }) => service.post(`/usuarios/login`, data),
    me: () => service.get(`/usuarios/me`),
  };
};

export default useAuthApi;
