/**
 * axios 二次封装
 */
import axios from 'axios'
// import { ElMessage } from 'element-plus'
import config from '../config'

// const TOKEN_INVALID = 'token认证失败，请重新登录'
// const NETWORK_ERROR = '网络请求异常'

// 创建axios对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})

// 请求拦截
// service.interceptors.request.use((req) => {
//   const headers = req.headers
//   return
// })

// 相应拦截
// service.interceptors.response.use((res) => {
//   const { code, data, msg } = res.data
//   if (code === 200) {
//     return data
//   } else if (code === 40001) {
//     ElMessage.error(TOKEN_INVALID)
//     return Promise.reject(TOKEN_INVALID)
//   } else {
//     ElMessage.error(msg || NETWORK_ERROR)
//     return Promise.reject(msg || NETWORK_ERROR)
//   }
// })

/**
 * 请求核心函数
 * @param {*} options  请求配置
 * @returns
 */
function request(options: any) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (typeof options.mock != 'undefined') {
    config.mock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
