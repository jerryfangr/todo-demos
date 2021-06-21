import {  
  RouteRecordRaw,
  createWebHistory,
  createRouter
} from 'vue-router'
import store from '@/store'
import Home from "@/pages/Home.vue";
import TodoList from '@/pages/TodoList.vue'


const routes: Array<RouteRecordRaw> = [
  { // todolist forms
    path: '/', 
    name: 'home',
    component: Home
  },
  { // todolist detail
    path: '/todolist/:name',
    name: 'todolist',
    component: TodoList,
    meta: { needLoadData: true },

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
    if (store.state.todo.currentTodoList !== -1) {
      next()
    } else {
      next({ name: 'home'})
    }
  } else {
    next()
  }
})

export default router