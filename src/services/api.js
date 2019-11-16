import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://192.168.1.105:8080/"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    //if (token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;