import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$http = axios.create({
  baseURL: 'http://localhost:3000',
})
app.use(store).use(router).use(ElementPlus).mount('#app')
