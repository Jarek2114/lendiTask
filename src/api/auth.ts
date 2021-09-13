import { LoginRequest } from '@/models/loginRequest';
import axios from 'axios';
import { BaseApi } from './baseApi';

export default new class AuthApi extends BaseApi {
    login(payload: LoginRequest): Promise<any> {
        return axios.post(this.getUrl('/token'), payload);
    }
        
    logout(): Promise<any> {
        return axios.post(this.getUrl('/logout'));
    }
}
