
import axios from "axios";

const BACKEND_SERVER_URL_DEV = 'http://192.168.0.13:8080';
const BACKEND_SERVER_URL_PROD = '/api';

export const BACKEND_SERVER_URL = process.env.NODE_ENV === 'development' ? BACKEND_SERVER_URL_DEV : BACKEND_SERVER_URL_PROD;

export const axiosInstance = axios.create({
    baseURL: BACKEND_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});