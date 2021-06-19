import {  
  RouteRecordRaw,
  createWebHistory,
  createRouter
} from 'vue-router'
import store from '@/store'
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
    component: () => import('@/pages/TodoList.vue'),
    props: true,
    meta: { needLoadData: false },

    children: [{ // todoitem detail
      path: 'todoitem/:id',
      component: () => import('@/pages/Home.vue'),
      props: true,
    }]
  },
  { // not match paths
    path: '/:pathMatch(.*)*',
      name: '404',
        redirect: (to) => {
          return '/';
        }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLoadData) {
    if (store.state.todo.isLoad) {
      next()
    } else {
      return { path: '/', }
    }
  } else {
    next()
  }
})

export default router