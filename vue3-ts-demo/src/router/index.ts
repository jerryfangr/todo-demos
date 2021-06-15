import {  
  RouteRecordRaw,
  createWebHistory,
  createRouter
} from 'vue-router'

import Home from "@/pages/Home.vue";


const routes: Array<RouteRecordRaw> = [
  { // todolist forms
    path: '/', 
    name: 'home',
    component: Home
  },
  { // todolist detail
    path: '/todolist/:name',
    name: 'todolist',
    component: Home,
    props: true,
    meta: { needLoadData: true },

    children: [{ // todoitem detail
      path: 'todoitem/:id',
      component: Home,
      props: true,
    }]
  },
  { // not match paths
    path: '*',
    name: '404',
    redirect: (to) => {
      return '/home';
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLoadData) {
    if (to) {
      
    }
  }
})

export default router