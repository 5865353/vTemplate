import Vue from 'vue'
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
    }
  ]
})
// 全局路由前置守卫 （导航触发时执行）
router.beforeEach((to, from, next) => {
  NProgress.start()
  setTimeout(()=>{
    next()
  },1500)

})
// 全局路由后置守卫 （导航结束时执行）
router.afterEach(() => {
  NProgress.done()
})

export default router