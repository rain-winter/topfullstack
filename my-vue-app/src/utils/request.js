import axios from 'axios'
import { ElMessage } from 'element-plus'
//创建axios实例
const instace = axios.create({
  baseURL: 'http://localhost:3009',
  timeout: 8000
});

// 相应拦截器
instace.interceptors.response.use(res => {
  const { data, code, msg } = res.data
  return { code, msg, data }
})

export default instace