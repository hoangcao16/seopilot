import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: { 'api-key': 'eyJz-CI6Ikp-4pWY-lhdCI6' },
});

const requestHandler = (request: any) => {
  const authorization = localStorage.getItem('token');
  request.headers.Authorization = `Bearer ${authorization}`;

  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    // window.location = '/login';
  }

  return response;
};

const errorHandler = (error: any) => {
  return Promise.reject(error.response);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
