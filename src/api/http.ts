import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import showCodeMessage from '@/api/code';
import { formatJsonToUrlParams, instanceObject } from '@/utils/format';
import useAuth from '@/store/auth';

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

const useAxiosInstance = (): AxiosInstance => {
  const auth = useAuth();
  // Crear instancia
  const axiosInstance: AxiosInstance = axios.create({
    // prefijo
    baseURL: BASE_PREFIX,
    // Se acabó el tiempo
    timeout: 1000 * 30,
    // encabezado de solicitud
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
    },
  });

  // interceptor de solicitudes
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // TODO Aquí puede agregar la lógica que desea procesar antes de enviar la solicitud
      // TODO loading
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // interceptor de respuesta
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status < 300) {
        return response;
      }
      if (response.status >= 400) ElMessage.info(JSON.stringify(response.status));
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;
      if (response) {
        ElMessage.error(showCodeMessage(response.status));
        return Promise.reject(response.data);
      }
      ElMessage.warning('Conexión de red defectuosa, Por favor, inténtelo de nuevo más tarde!');
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
interface Service {
  get: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  post: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  put: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  patch: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  delete: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  upload: (url: string, file: File) => Promise<AxiosResponse<any, any>>;
  download: (url: string, data: instanceObject) => void;
}

const useService = (): Service => {
  const axiosInstance = useAxiosInstance();
  return {
    get: (url: string, data?: object) => axiosInstance.get(url, { params: data }),
    post: (url: string, data?: object) => axiosInstance.post(url, data),
    put: (url: string, data?: object) => axiosInstance.put(url, data),
    patch: (url: string, data?: object) => axiosInstance.patch(url, data),
    delete: (url: string, data?: object) => axiosInstance.delete(url, data),
    upload: (url: string, file: File) =>
      axiosInstance.post(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    download: (url: string, data: instanceObject) => {
      const downloadUrl = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
      window.location.href = downloadUrl;
    },
  };
};

export default useService;
