import useService from '@/api/http';

const useUsuarioApi = () => {
  const service = useService();
  const endpoint = 'usuarios';
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: any) => service.get(`/${endpoint}/${id}`, data),
    create: (data: any) => service.post(`/${endpoint}/sign-up`, data),
    update: (id: number | string, data: any) => service.patch(`/${endpoint}/${id}`, data),
    changePassword: (id: number | string, data: any) => service.patch(`/${endpoint}/${id}/change-password`, data),
  };
};

export default useUsuarioApi;
