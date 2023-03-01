import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.VITE_BASEURL,
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 获取用户信息
  },
  err => {
    return Promise.reject(err)
  }
)
