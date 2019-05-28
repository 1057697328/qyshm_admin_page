// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/vendor/fontawesome-free/css/all.min.css'
import '@/assets/css/sb-admin-2.min.css'
import '@/assets/js/sb-admin-2.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import jQuery from 'jquery'
import $ from 'jquery'

import CONSTANT from '@/assets/js/constant'

import swal from 'sweetalert'


axios.defaults.baseURL="http://127.0.0.1:8080";


Vue.use(VueAxios,axios);
Vue.prototype.$CONSTANT=CONSTANT;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
