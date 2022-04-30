import { createRouter, createWebHashHistory } from 'vue-router'

// import HelloWorld from '../components/HelloWorld.vue'
import Main from '../views/Main.vue'
import CourseList from '../views/course/CourseList.vue'

const routes = [
  {
    name: '主页',
    path: '/',
    component: Main,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: '欢迎页',
        component: () => import('../views/welcome/Welcome.vue')
      },
      {
        name: 'courses',
        path: '/courses/list',
        meta: '课程列表',
        component: () => import('../views/course/CourseList.vue'),
      },
      {
        name: 'episodes',
        path: '/episodes/list',
        meta: '课时列表',
        component: () => import('../views/episode/EpisodeList.vue')
      },
      {
        name: 'users',
        path: '/users/list',
        meta: '用户列表',
        component: () => import('../views/user/UserList.vue')
      },
      {
        name: 'add',
        path: '/add',
        meta: '添加用户',
        component: () => import('../views/episode/AddEpisodeList.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
