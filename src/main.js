import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import axios from 'axios';

import 'vant/lib/index.css';

Vue.use(Vant);
// 绑定到原型上
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(to);

  // 路由守卫进行登录权限校验
  if(to.meta.auth){

    const userToken = localStorage.getItem("userToken");

    if(userToken){
      return next();
    }else{
      return router.push('/login')
    }
  }

  // 路由守卫需要放行
  next();

})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')