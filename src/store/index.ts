import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import { SET_SERVER_ERRORS } from './mutation-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverErrors: []
  },
  mutations: {
    [SET_SERVER_ERRORS] (state, serverErrors) {
      state.serverErrors = serverErrors;
    }
  },
  getters: {
    serverErrors(state) {
      return state.serverErrors;
    }
  },
  actions: {
  },
  modules: {
    auth,
    user
  }
})
