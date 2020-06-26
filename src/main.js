import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import axios from 'axios';

import 'vant/lib/index.css';

Vue.use(Vant);

import { Toast } from 'vant';

// 绑定到原型上
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";

// 请求拦截器
axios.interceptors.request.use(config=>{
  
  if(localStorage.getItem('userToken')&& !config.headers.Authorization){
    config.headers.Authorization = "Bearer " + localStorage.getItem('userToken')
  }

  return config
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);

  // 路由守卫进行登录权限校验
  if (to.meta.auth) {

    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      return next();
    } else {
      return router.push('/login')
    }
  }

  // 路由守卫需要放行
  next();

})

// 拦截器配置
axios.interceptors.response.use(res => {
  const {
    statusCode,
    message
  } = res.data;

  if (message === "用户信息验证失败") {
    Toast.fail('用户信息校验失败，重新登录');

    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');

    router.replace('/login')
  }

  return res;

})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')