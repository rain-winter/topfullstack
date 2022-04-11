import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
// import CoursesListView from '../views/courses/CoursesListView.vue'
// import CourseEditView from '../views/courses/CourseEditView.vue'
import CoursesCrud from '../views/ResourcesCrud.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        component: HomeView,
      },
      {
        name: 'courses',
        path: '/:resource/list',
        component: CoursesCrud,
        props: true,
      },

      // {
      //   name: 'courses',
      //   path: '/courses/list',
      //   component: CoursesListView,
      // },
      // {
      //   name: 'courses-edit',
      //   path: '/courses/edit/:id',
      //   component: CourseEditView,
      // },
      // {
      //   name: 'courses-create',
      //   path: '/courses/create',
      //   component: CourseEditView,
      // },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
