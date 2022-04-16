import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './../components/Home.vue'
import WelCome from '../views/WelCome.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,

  },
  // {
  //   name: 'login',
  //   path: '/login',
  //   meta: {
  //     title: '登录'
  //   },
  //   component: () => import('../views/Login.vue')
  // }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
