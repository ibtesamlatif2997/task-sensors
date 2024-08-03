import axios, { isCancel, AxiosError } from 'axios';
import { Password } from '../types/types';
import "./http.interceptor"

const SERVER_URL = "http://localhost:8081"

export const GeneratorService = {
    get: async () => {
        const resp = await axios.get(SERVER_URL+'/config');
        return resp.data;
    },

}