import { Person } from '@/models/person';
import axios from 'axios';
import { BaseApi } from './baseApi';

export default new class AuthApi extends BaseApi {
    getUsers(): Promise<any> {
        return axios.get(this.getUrl('/api/users'));
    }
        
    createUser(user: Person): Promise<any> {
        return axios.post(this.getUrl('/api/users'), user);
    }
    
    getUserDetails(userId: string) {
        return axios.get(this.getUrl(`/api/users/${userId}`));
    }

    removeUser(userId: string) {
        return axios.delete(this.getUrl(`/api/users/${userId}`));
    }

    updateUser(userId: string, updatedData: Person) {
        return axios.put(this.getUrl(`/api/users/${userId}`), updatedData);
    }
}