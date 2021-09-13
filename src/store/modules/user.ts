import { UserState } from '@/models/userState';
import { Person } from '@/models/person';
import { User } from '@/models/user';
import { SET_USERS, ADD_USER, REMOVE_USER, SET_SERVER_ERRORS } from '../mutation-types';
import usersApi from '@/api/users';

const state: UserState = {
    users: [],
    errors: []
}

const getters = {
    users(state: UserState) {
        return state.users;
    }
}

const actions = {
    getUsers({ commit }: any) {
        usersApi.getUsers().then(({ data: users }: { data: User[] }) => {
            commit(SET_USERS, users);
        });
    },
    createUser({ commit }: any, user: Person) {
        usersApi.createUser(user).then(({ data: user }: { data: User }) => {
            commit(ADD_USER, user);
        });
    },
    removeUser({ commit }: any, id: string) {
        usersApi.removeUser(id).then(() => {
            commit(REMOVE_USER, id);
        });
    },   
    updateUser({ commit }: any, { id, user}: { id: string, user: User} ) {
        return usersApi.updateUser(id, user).then((response) => {
            commit(SET_SERVER_ERRORS, []);
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.errors) {
                commit(SET_SERVER_ERRORS, error.response.data.errors);
            }
        });
    },
}

const mutations = {
    [SET_USERS] (state: UserState, users: User[]) {
        state.users = users;
    },    
    [ADD_USER] (state: UserState, user: User) {
        state.users.push(user);
    },    
    [REMOVE_USER] (state: UserState, id: string) {
        const userIndex = state.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            state.users.splice(userIndex, 1);
        }
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}