import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router/router'
import store from './store/store'
import antdesig from 'ant-design-vue'
import { axios } from "@/config/request"

// 挂载到vue 原型
Vue.prototype.$http = axios
// 生产模式提示
Vue.config.productionTip = false

// localStorage 插件
Vue.use(Storage,{
    namespace: 'gyapp__',
    name: 'ls',
    storage: 'local'
})
Vue.use(antdesig)


import 'ant-design-vue/dist/antd.less'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
