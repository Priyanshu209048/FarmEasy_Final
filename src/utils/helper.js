import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = 'http://localhost:8080/api/v1';

export const myAxios = axios.create({
    baseURL: BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use((config) => {
        const token = getToken();
        console.log(token);
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(config);
        }
        return config;
    }, 
    error => Promise.reject(error)
);