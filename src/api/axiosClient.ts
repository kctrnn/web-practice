import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import { TOKEN } from 'constants/index';

const axiosClient = axios.create({
  baseURL: 'https://api-wp.herokuapp.com/api',
  headers: {
    'content-type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const customHeaders: AxiosRequestHeaders = {};

    const accessToken = localStorage.getItem(TOKEN);
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // can override for some requests
      },
    };
  },

  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },

  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosClient;
