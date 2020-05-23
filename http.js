import axios from 'axios'

import Vue from 'vue'
import router from './src/router'

const http = axios.create({
  baseURL:'http://112.74.99.5:3000/web/api'
})

http.interceptors.request.use((config) => {
  if (localStorage.getItem('token')&&localStorage.getItem('id')) {
      config.headers.Authorization= 'Bearer '+localStorage.getItem('token')
  }
  return config;
},(error) => {
  return Promise.reject(error);
})

http.interceptors.response.use((response) => {
  return response;
},(error) => {
  if (error.response.status == 401||error.response.status == 402) {
    router.push('/login');
    Vue.prototype.$toast.fail(error.response.data.message);
  }
  return Promise.reject(error);
})


export default http;