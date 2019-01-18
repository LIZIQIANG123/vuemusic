// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { TransferDom } from 'vux'
import axios from 'axios'
import store from '@/store/index.js';
import 'font-awesome/css/font-awesome.css'
Vue.directive('transfer-dom', TransferDom)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios
/* eslint-disable no-new */
let vueProject= new Vue({
  el: '#app', 
  router,
  store,
  components: { App },
  template: '<App/>',
 
})
export {vueProject}