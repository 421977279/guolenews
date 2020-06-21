import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import axios from 'axios';

import 'vant/lib/index.css';

Vue.use(Vant);
// 绑定到原型上
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
