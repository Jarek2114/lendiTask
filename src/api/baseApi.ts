import axios from 'axios';
import store from '../store';

const BASE_URL = 'http://lendi-recruitment.azurewebsites.net';
const AUTH_HEADER_KEY = 'Authorization';
const AUTH_HEADER_PREFFIX = 'Bearer ';

export class BaseApi {
    getUrl(path: string): string {
        return `${BASE_URL}${path}`;
    }
}

axios.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers[AUTH_HEADER_KEY] = `${AUTH_HEADER_PREFFIX}${store.getters.token}`;
        }

        return config;
    }
)