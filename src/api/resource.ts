import useService from '@/api/http';

const useResourceApi = (endpoint: string) => {
  const service = useService();
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: any) => service.get(`/${endpoint}/${id}`, data),
    create: (data: any) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: any) => service.patch(`/${endpoint}/${id}`, data),
    delete: (id: number | string) => service.delete(`/${endpoint}/${id}`),
    getLinks: (id: number, from: string) => service.get(`/${endpoint}/${id}/${from}/links`),
    link: (id: number, from: string, data: { relationId: number; link: boolean }) =>
      service.post(`/${endpoint}/${id}/${from}/links`, data),
  };
};

export default useResourceApi;
