import { createRouter, createWebHashHistory } from 'vue-router'

// import HelloWorld from '../components/HelloWorld.vue'
import Main from '../views/Main.vue'
import Course from '../views/course/Course.vue'

const routes = [
  {
    name: '主页',
    path: '/',
    component: Main,
    children: [
      {
        path: '/courses',
        component: Course,
      }
    ]

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
