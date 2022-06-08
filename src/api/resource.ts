import useService from '@/api/http';

const useResourceApi = (endpoint: string) => {
  const service = useService();
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: any) => service.get(`/${endpoint}/${id}`, data),
    create: (data: any) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: any) => service.patch(`/${endpoint}/${id}`, data),
    delete: (id: number | string) => service.post(`/${endpoint}/${id}`),
  };
};

export default useResourceApi;
