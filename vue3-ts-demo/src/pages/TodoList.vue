<template>
  <input class="todolist-title" v-model="todoList.title"/>
  <hr>
  <!-- todolist -->
  <ul class="todolist-items">
    <!-- unknow card start -->
    <div class="unknow-card">
      <div class="table-title">
        No Status 
        <span class="todo-number">{{ unknowTodos.length }}</span>
      </div>
      <todo-card
        v-for="(todo, index) in unknowTodos"
        @deleteEvent="handlerDelete($event, index)"
        @editEvent="handlerEdit($event, index)"
        :openLoading="loading"
        :key="todo.id"
        cardStyle="width: 90%; font-size: 1.1em; height: 38px; margin-bottom: 10px;"
      >
        {{ todo.title }}
      </todo-card>
    </div>
    <!-- unknow card end -->

    <!-- todo card start -->
    <div class="todo-card">
      <div class="table-title">
        Todo
        <span class="todo-number">{{ todoTodos.length }}</span>
      </div>
      <todo-card
        v-for="(todo, index) in todoTodos"
        @deleteEvent="handlerDelete($event, index)"
        @editEvent="handlerEdit($event, index)"
        :openLoading="loading"
        :key="todo.id"
        cardStyle="width: 90%; font-size: 1.1em; height: 38px; margin-bottom: 10px;"
      >
        {{ todo.title }}
      </todo-card>
    </div>
    <!-- todo card end -->

    <!-- in progress card start -->
    <div class="inprogress-card">
      <div class="table-title">
        In progress
        <span class="todo-number">{{ inprogressTodos.length }}</span>
      </div>
      <todo-card
        v-for="(todo, index) in inprogressTodos"
        @deleteEvent="handlerDelete($event, index)"
        @editEvent="handlerEdit($event, index)"
        :openLoading="loading"
        :key="todo.id"
        cardStyle="width: 90%; font-size: 1.1em; height: 38px; margin-bottom: 10px;"
      >
        {{ todo.title }}
      </todo-card>
    </div>
    <!-- in progress card end -->

    <!-- completed card start -->
    <div class="completed-card">
      <div class="table-title">
        Completed
        <span class="todo-number">{{ completedTodos.length }}</span>
      </div>
      <todo-card
        v-for="(todo, index) in completedTodos"
        @deleteEvent="handlerDelete($event, index)"
        @editEvent="handlerEdit($event, index)"
        :openLoading="loading"
        :key="todo.id"
        cardStyle="width: 90%; font-size: 1.1em; height: 38px; margin-bottom: 10px;"
      >
        {{ todo.title }}
      </todo-card>
    </div>
    <!-- completed card end -->
  </ul>
  <!-- todolist -->

  <router-view></router-view>
</template>

<script setup lang="ts">
// components
import TodoCard from '@/components/TodoCard.vue'
import { ref, watch, computed} from 'vue'
// local
import { useTodoStore } from '@/hooks'
import { useRouter, useRoute } from 'vue-router'
import lodash from 'lodash'
import type {TodoList} from '@/store/modules/todo/types'

const {state, dispatch, commit, getters} = useTodoStore()

const router = useRouter()
if (getters['todo/currentTodoList'] === undefined) {
  router.push({path: '/'})
} 

ref: loading = false

const todoList = getters['todo/currentTodoList'] || {} as TodoList

watch(() => todoList.title, lodash.throttle((newVal, oldVal) => {
  dispatch('todo/SAVE_DATA')
}, 150), {
  deep: true,
  immediate: false
})


const unknowTodos = computed(() => {
  return todoList.todoItems.filter(todo => {
    return todo.status === 'none'
  })
})

const todoTodos = computed(() => {
  return todoList.todoItems.filter(todo => {
    return todo.status === 'todo'
  })
})

const inprogressTodos = computed(() => {
  return todoList.todoItems.filter(todo => {
    return todo.status === 'in progress'
  })
})

const completedTodos = computed(() => {
  return todoList.todoItems.filter(todo => {
    return todo.status === 'completed'
  })
})


const handlerDelete = () => {
  console.log('handlerDelete')
}

const handlerEdit = () => {
  console.log('handlerEdit')
}

</script>

<style scoped lang="scss">
.todolist-title {
  width: 100%;
  height: 44px;
  font-size: 2em;
  font-weight: 600;
  padding: 18.7px 0 8.5px 0;
  box-sizing: content-box;
  color: #2c3e50;
}
.todolist-items {
  display: grid;
  grid-template-columns: repeat(4, 24%);
  justify-content: space-between;
  .table-title {
    width: 75px;
    height: 20px;
    line-height: 20px;
    word-break: keep-all;
    white-space: nowrap;
    border-radius: 5px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;

    .todo-number {
      margin-left: 15px;
    }
  }
  .unknow-card .table-title {
    background: #efefef;
  }
  .todo-card .table-title {
    background: #ffccd1;
    width: 40px;
  }
  .inprogress-card .table-title {
    background: #fbeecc;
    width: 85px;
  }
  .completed-card .table-title {
    background: #cce7e1;
    width: 80px;
  }

}

</style>
