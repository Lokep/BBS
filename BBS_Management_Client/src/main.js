// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "./utils/http"; // 引入封装好的ajax插件axios
import store from "./vuex/store"; // 引入vuex文件
import echarts from 'echarts'; // 引入echarts图表插件

Vue.use(ElementUI);

Vue.config.productionTip = false;
// 将axios, store, echarts 添加到vue的原型链上
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
