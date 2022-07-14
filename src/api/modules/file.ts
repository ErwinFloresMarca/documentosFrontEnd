import useService from '@/api/http';

const useFileApi = () => {
  const service = useService();
  const endpoint = 'files';
  const baseApiUrl = import.meta.env.VITE_API_BASEURL;
  return {
    downloadUrl: (filename: string) => `${baseApiUrl}${endpoint}/${filename}`,
    downloadUrlById: (fileId: number) => `${baseApiUrl}${endpoint}/download/by-id/${fileId}`,
    getBase64ById: (fileId: number) => service.get(`${baseApiUrl}/${endpoint}/base64/by-id/${fileId}`),
    getById: (id: string | number) => service.get(`${endpoint}/by-id/${id}`),
    createUrl: () => `${baseApiUrl}/${endpoint}`,
  };
};

export default useFileApi;
