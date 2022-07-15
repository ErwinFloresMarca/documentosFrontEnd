import { DocumentoEvento } from '../types/documento-evento';
import useService from '@/api/http';
import { ComodinObject } from '@/types';

const useDocumentoEventoResourceApi = () => {
  const endpoint = 'documento-eventos';
  const service = useService();
  return {
    list: (data?: ComodinObject) => service.get(`/${endpoint}`, data),
    create: (data: Partial<DocumentoEvento>) => service.post(`/${endpoint}`, data),
  };
};

export default useDocumentoEventoResourceApi;
