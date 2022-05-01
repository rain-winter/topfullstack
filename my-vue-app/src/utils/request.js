import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
//创建axios实例
const instace = axios.create({
  baseURL: 'http://localhost:3009',
  timeout: 8000
});

const TOKEN_INVALID = 'token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常'

// 请求拦截
instace.interceptors.request.use((req) => {
  const headers = req.headers
  const token = localStorage.getItem('token') || ''

  if (!headers.Authorization) headers.Authorization = 'Bearer ' + token
  return req
})

/**
 * 相应拦截
 * res, error.error部分解析失败的请求（400，401 400等）
 */
instace.interceptors.response.use(res => {
  // 返回后端返回的数据
  return res.data
}, error => {
  if (error.response.status == 401) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => { }, 1500)
    router.push({
      name: 'login'
    })
  } else {
    ElMessage.error(NETWORK_ERROR)
  }
})

export default instace