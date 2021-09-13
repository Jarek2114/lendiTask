import { AuthState } from '@/models/authState';
import { SET_TOKEN, SET_EXPIRES } from '../mutation-types';
import authApi from '@/api/auth';
import { LoginResponse } from '@/models/loginResponse';

const USERNAME = 'jtarnocki';
const PASSWORD = 'Finanse0249669#@!';

const state: AuthState = {
    token: '',
    expires: 0
}

const getters = {
    token(state: AuthState) {
        return state.token;
    }
}

const actions = {
    login({ commit, dispatch }: any) {
        const loginData = {
            username: USERNAME,
            password: PASSWORD
        };
        return authApi.login(loginData).then(({ data }: { data: LoginResponse }) => {
            commit(SET_TOKEN, data.access_token || null);
            commit(SET_EXPIRES, data.expires || 0);
            dispatch('getUsers');
        });
    },
    logout({ commit }: any) {
        authApi.logout().then(() => {
            commit(SET_TOKEN, null);
        });
    }
}

const mutations = {
    [SET_TOKEN] (state: AuthState, token: string) {
        state.token = token;
    },
    [SET_EXPIRES] (state: AuthState, expires: number) {
        state.expires = expires;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}