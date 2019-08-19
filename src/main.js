import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router/router'
import store from './store/store'
import antdesig from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Storage,{
    namespace: 'dj__',
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
