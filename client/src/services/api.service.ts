import axios, { isCancel, AxiosError } from 'axios';
import { Password } from '../types/types';

const SERVER_URL = "http://localhost:8080"


const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaWJ0ZXNhbUBnbWFpbC5jb20iLCJleHBpcmVzIjoxNzIyODQ1OTMwLjc3MDIyNTh9.M_Yzom4Hc9GOcj9g4Ptn_7cIZlTEVxLNB1WV20py7MU"
    }
});


export const APIService = {

    login: async (params:Password) => {
        const resp = await axiosInstance.post('/admin/login', params);
        return resp.data;
    },

    getFilters: async () => {
        const resp = await axiosInstance.get('/api/filters');
        return resp.data;
    },

    getHourlyData: async (params: any) => {
        const resp = await axiosInstance.get('/api/counts', { params });
        return resp.data;
    },

    getPedestrianCounts: async (params: any) => {
        const resp = await axiosInstance.get('/api/pedestrian_counts', { params });
        return resp.data;
    },

    getHourlyDataByClass: async (params: any) => {
        const resp = await axiosInstance.get('/api/hourly_data', { params });
        return resp.data;
    }
}