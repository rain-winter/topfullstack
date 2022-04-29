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
        component: () => import('../views/welcome/Welcome.vue')
      },
      {
        name: 'courses',
        path: '/courses/list',
        component: () => import('../views/course/CourseList.vue'),
      },
      {
        name: 'episodes',
        path: '/episodes/list',
        component: () => import('../views/episode/EpisodeList.vue')
      },
      {
        name: 'users',
        path: '/users/list',
        component: () => import('../views/user/UserList.vue')
      },
      {
        name: 'add',
        path: '/add',
        component:()=>import('../views/episode/AddEpisodeList.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
