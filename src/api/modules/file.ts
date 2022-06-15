import useService from '@/api/http';

const useFileApi = () => {
  const service = useService();
  const endpoint = 'files';
  const baseApiUrl = import.meta.env.VITE_API_BASEURL;
  return {
    downloadUrl: (filename: string) => `${baseApiUrl}/${endpoint}/${filename}`,
    getById: (id: string | number) => service.get(`/${endpoint}/${id}`),
    createUrl: () => `${baseApiUrl}/${endpoint}`,
  };
};

export default useFileApi;
