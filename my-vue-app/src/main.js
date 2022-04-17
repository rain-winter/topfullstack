import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3009/' // 后端地址

const app = createApp(App)
app.use(router).use(ElementPlus)
app.mount('#app')

console.log(import.meta.env.MODE)
console.log(import.meta.env.DEV)