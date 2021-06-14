import {  
  RouteRecordRaw,
  createWebHistory,
  createRouter
} from 'vue-router'

import Home from "@/pages/Home.vue";


const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router