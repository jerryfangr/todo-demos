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
  {
    path: '/todolist/:name',
    name: 'todolist',
    component: Home,
    children: [{
      path: '/todoitem/:id',
      component: Home,
    }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router