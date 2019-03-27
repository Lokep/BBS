import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null
  },
  mutations: {
    saveUserInfo: (state, data) => {
      state.user = data;
      state.token = Date.now()
    },
    delUserInfo: (state, data) => {
      state.user = {};
      state.token = null;
    }
  }
});
