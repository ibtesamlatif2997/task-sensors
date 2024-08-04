import axios, { isCancel, AxiosError } from 'axios';
import { ConfigData } from '../types/types';
import "./http.interceptor"

const SERVER_URL = process.env.REACT_APP_GENERATOR_URL;

export const GeneratorService = {
    get: async () => {
        const resp = await axios.get(SERVER_URL + '/config');
        return resp.data;
    },

    create: async (data: ConfigData) => {
        const resp = await axios.post(SERVER_URL + '/config', data);
        return resp.data;
    },
}