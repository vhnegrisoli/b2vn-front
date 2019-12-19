import axios from 'axios';
import { getToken } from './auth';
import { BACK_END_AUTH } from '../utils/api';

const api = axios.create({
  baseURL: BACK_END_AUTH,
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
