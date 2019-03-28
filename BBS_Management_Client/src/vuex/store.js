import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户登录信息
    user: {},
    token: null
  },
  mutations: {
    // 保存用户信息
    saveUserInfo: (state, data) => {
      state.user = data;
      state.token = Date.now()
    },
    // 删除用户信息
    delUserInfo: (state, data) => {
      state.user = {};
      state.token = null;
    }
  }
});
