import Vue from 'vue'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/home/home.vue')
        },
        {
            path: '/user',
            component: () => import(/* webpackChunkName: "users" */ '@/views/users/userLayout'),
            redirect: '/user/signIn',
            children: [
                {
                    path: 'register',
                    name: 'register',
                    component: () => import(/* webpackChunkName: "users" */ '@/views/users/register')
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "users" */ '@/views/users/login')
                }
            ]
        },
        {
            path:'*',
            name:'404',
            redirect:'/',
        }
    ]
})

// 全局路由前置守卫 （导航触发时执行）
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 做权限拦截 判断本地是否有 token
    // if (Vue.ls.get(ACCESS_TOKEN)) {
    //     // 如果有token 不让他访问登录页
    //     if (!(to.path === '/user/signIn')) return next()
    //     next({path: to.query.redirect || '/'})
    // } else {
    //      next({path: '/user/signIn', query: {redirect: to.fullPath}})
    // }

    next()

})
// 全局路由后置守卫 （导航结束时执行）
router.afterEach(() => {
    NProgress.done()
})

export default router