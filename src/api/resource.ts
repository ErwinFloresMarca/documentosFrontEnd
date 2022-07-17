import useService from '@/api/http';
import { ComodinObject } from '@/types';

const useResourceApi = <T>(endpoint: string) => {
  const service = useService();
  return {
    count: (data?: ComodinObject) => service.get(`/${endpoint}/count`, data),
    list: (data?: ComodinObject) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: ComodinObject) => service.get(`/${endpoint}/${id}`, data),
    create: (data: Partial<T>) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: Partial<T>) => service.patch(`/${endpoint}/${id}`, data),
    delete: (id: number | string) => service.delete(`/${endpoint}/${id}`),
    getLinks: (id: number, from: string) => service.get(`/${endpoint}/${id}/${from}/links`),
    link: (id: number, from: string, data: { relationId: number; link: boolean }) =>
      service.post(`/${endpoint}/${id}/${from}/links`, data),
  };
};

export default useResourceApi;
