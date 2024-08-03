import axios, { isCancel, AxiosError } from 'axios';

export default axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization =  `Bearer ${token}`;

    return config;
});