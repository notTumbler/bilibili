import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'

import {Toast} from 'vant'
Vue.prototype.$toast = Toast;

import http from '../http'
Vue.prototype.$http = http
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
