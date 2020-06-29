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
    },
    // 个人中心页
    {
        path: '/personal',
        name: 'Personal',
        component: () => import("@/views/personal"),
        meta: {
            auth: true
        }
    },
    // 我的关注页
    {
        path: '/follow',
        name: 'Follow',
        component: () => import("@/views/personal/Follow"),
        meta: {
            auth: true
        }
    },
    // 我的跟帖页
    {
        path: '/comments',
        name: 'Comments',
        component: () => import("@/views/personal/Comments"),
        meta: {
            auth: true
        }
    },
    // 我的收藏页
    {
        path: '/posts',
        name: 'Posts',
        component: () => import("@/views/personal/Posts"),
        meta: {
            auth: true
        }
    },
    // 编辑页
    {
        path: '/edit',
        name: 'Edit',
        component: () => import("@/views/personal/Edit"),
        meta: {
            auth: true
        }
    },
    // 测试页
    {
        path: '/test',
        name: 'Test',
        component: () => import("@/views/personal/Test")
    }
]

const router = new VueRouter({
    routes
})

export default router