import Vue from 'vue';
import VueRouter from 'vue-router';
import Vant from 'vant';

Vue.use(VueRouter);
Vue.use(Vant);


const routes = [
    // 首页
    {
        path: '/',
        name: 'Index',
        component: () => import("@/views/Index")
    },
    // 登录页 
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/pages/Login")
    },
    // 注册页
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/pages/Register")
    }
]

const router = new VueRouter({
    routes
})

export default router