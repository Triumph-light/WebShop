import axios from 'axios'
// 引入userStore
import { useUserStore } from '@/stores/index.js'
import router from '../router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 判断请求头是否有token
    if (userStore.user.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
instance.interceptors.response.use(
  res => res.data,
  err => {
    // 当未认证的时候回到登录页
    if (err.response && err.response.status === 401) {
      router.push()
    }
    return Promise.reject(err)
  }
)

// 请求封装
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
