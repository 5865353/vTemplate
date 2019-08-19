import Vue from 'vue'
import axios from 'axios'
import {notification} from 'ant-design-vue'
import {ACCESS_TOKEN} from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
    timeout: 3000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        let data = error.response.data
        console.log("------异常响应------", error.response.status)
        switch (error.response.status) {
            case 403:
                notification.error({message: '系统提示', description: '拒绝访问', duration: 4})
                break
            case 500:
                notification.error({message: '系统提示', description: '很抱歉，服务器错误!', duration: 4})
                break
            case 404:
                notification.error({message: '系统提示', description: '很抱歉，资源未找到!', duration: 4})
                break
            case 504:
                notification.error({message: '系统提示', description: '网络超时'})
                break
            case 401:
                notification.error({message: '系统提示', description: '未授权，请重新登录', duration: 4})
                break
            default:
                notification.error({
                    message: '系统提示',
                    description: '权限不足',
                    duration: 4
                })
                break
        }
    }
    return Promise.reject(error)
}

// 请求时拦截
service.interceptors.request.use(config => {
    // 这里可以配置 让每次请求时都带上 token 码 如果需要的话
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
        config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token
    }
    // get 请求时 加上时间戳 不让浏览器缓存
    if (config.method.toLowerCase() === 'get') {
        config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
        }
    }

    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应时拦截 interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)


export {
    service as axios
}