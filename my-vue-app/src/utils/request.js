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

// 相应拦截
instace.interceptors.response.use(res => {
  const { data, code, msg } = res.data
  if (code == 40001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => { }, 1500)
    router.push({
      name: 'login'
    })
  }
  return { code, msg, data }
})

export default instace