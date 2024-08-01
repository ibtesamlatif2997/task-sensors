import axios, { isCancel, AxiosError } from 'axios';

const SERVER_URL = "http://localhost:8080"

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaWJ0ZXNhbUBnbWFpbC5jb20iLCJleHBpcmVzIjoxNzIyNTM2NDA4LjcyODkxNzR9.wqD2fEweTnEym0kOp2tk0OmhIRYzdguJILRglF5mVas"
    }
});


export const APIService = {

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
    }
}