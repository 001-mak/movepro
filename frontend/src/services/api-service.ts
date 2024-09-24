import axios, { AxiosResponse } from 'axios';
import authHeader from './auth-header';

const baseURL = import.meta.env.VITE_API_BASE_CONTOLLER_URL;
// const baseURL = "http://localhost:8001/api/v1";

interface ErrorResponse {
  response?: {
    status: number;
  };
}

const handleUnauthorized = () => {
  localStorage.removeItem('user');
  window.location.href = '/auth/signin';
};

const createApiCall = (method: 'post' | 'put' | 'get' | 'delete') => {
  return async (url: string, body?: any, extra: object = {}): Promise<AxiosResponse> => {
    try {
      const config = {
        ...extra,
        headers: authHeader(),
        method,
        url: baseURL + url,
        data: body,
      };

      const response = await axios(config);
      return response;
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
      throw error;
    }
  };
};

export const postApiCall = createApiCall('post');
export const putApiCall = createApiCall('put');
export const getApiCall = createApiCall('get');
export const deleteApiCall = createApiCall('delete');