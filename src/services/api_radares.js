import axios from "axios";
import { getToken } from "./auth";

const api_radares = axios.create({
    baseURL: "http://localhost:8081"
});

api_radares.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



export default api_radares;