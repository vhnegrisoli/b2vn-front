import axios from 'axios';
import { getToken } from './auth';
import { BACK_END_RADARES } from '../utils/api';

const api_radares = axios.create({
  baseURL: BACK_END_RADARES,
});

api_radares.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api_radares;
