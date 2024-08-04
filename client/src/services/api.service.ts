import axios, { isCancel, AxiosError } from 'axios';
import { Password } from '../types/types';
import "./http.interceptor"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const APIService = {

    login: async (params:Password) => {
        const resp = await axios.post(SERVER_URL+'/admin/login', params);
        return resp.data;
    },

    getFilters: async () => {
        const resp = await axios.get(SERVER_URL+'/api/filters');
        return resp.data;
    },

    getHourlyData: async (params: any) => {
        const resp = await axios.get(SERVER_URL+'/api/counts', { params });
        return resp.data;
    },

    getPedestrianCounts: async (params: any) => {
        const resp = await axios.get(SERVER_URL+'/api/pedestrian_counts', { params });
        return resp.data;
    },

    getHourlyDataByClass: async (params: any) => {
        const resp = await axios.get(SERVER_URL+'/api/hourly_data', { params });
        return resp.data;
    }
}