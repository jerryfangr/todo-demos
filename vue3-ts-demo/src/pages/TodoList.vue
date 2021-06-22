<template>
  <input class="title" v-model="originTodoList.title"/>
  <!-- add 参考home -->
  <hr>
  <!-- todolist -->
  <ul class="todolist-items">

    <div 
      v-for="(todolist, index) in splitedTodoList"
      :class="todolist.className + '-card'"
      :key="index"
    >
      <!-- status start -->
      <div class="table-title">
        {{ todolist.statusName }} 
        <span class="todo-number">{{ todolist.value.length }}</span>
      </div>
      <!-- status end -->

      <!-- todo cards start -->
      <todo-card
        v-for="todo in todolist.value"
        @deleteEvent="handlerDelete(todo)"
        @editEvent="handlerEdit(todo)"
        :openLoading="loading"
        :key="todo.id"
        cardStyle="width: 90%; font-size: 1.1em; height: 38px; margin-bottom: 10px;"
      >
        {{ todo.title }}
      </todo-card>
      <todo-card
        align="center"
        hiddenDelete
        @editEvent="createTodoItem(todolist.statusName)"
        cardStyle="width: 90%; font-size: 2.2em; height: 38px; color: #9a8e8e; font-weight: 300;"
      >
        +
      </todo-card>
      <!-- todo cards end -->
    </div>

  </ul>
  <!-- todolist -->

  <!-- todoitem view  start -->
  <div class="todoitem-wrapper" v-show="showTodoView" @click="toggleTodoView"></div>
  <div class="todoitem-view" v-show="showTodoView">
    <input class="title" v-model="editTodoItem.title"/>
    <hr>

    <div class="status-selector">
      <span class="text">status</span> 
      <n-dropdown trigger="click" @select="handleSelect" :options="options">
        <n-button 
          :keyboard="false"
          color="#83837d"
          ghost
          text
          style="font-size: 1.2em; font-weight: 600; margin-left: 30px; " 
        >
          {{ editTodoItem.status }}
        </n-button>
      </n-dropdown>

    </div>
    
    <textarea class="content" placeholder="Your content" v-model="editTodoItem.content"></textarea>
  </div>
  <!-- todoitem view  end -->
</template>

<script setup lang="ts">
// components
import TodoCard from '@/components/TodoCard.vue'
import { NDropdown, NButton  } from 'naive-ui'

// local
import { ref, watch, computed} from 'vue'
import type { Ref } from 'vue'
import { useTodoStore } from '@/hooks'
import { useRouter } from 'vue-router'
import lodash from 'lodash'
import type { TodoItem, TodoList } from '@/store/modules/todo/types'

const {dispatch, getters} = useTodoStore()

// check TodoList
const router = useRouter()
if (getters['todo/currentTodoList'] === undefined) {
  router.push({path: '/'})
} 

// auto update the title of todoList
const originTodoList = getters['todo/currentTodoList'] || {} as TodoList
watch(() => originTodoList.title, lodash.throttle((newVal, oldVal) => {
  dispatch('todo/SAVE_DATA')
}, 200), {
  deep: true,
  immediate: false
})

// split and group todos by status
const noStatusTodos = computed(() => {
  return originTodoList.todoItems.filter(todo => todo.status === 'no status')
})
const todoTodos = computed(() => {
  return originTodoList.todoItems.filter(todo => todo.status === 'todo')
})
const inprogressTodos = computed(() => {
  return originTodoList.todoItems.filter(todo => todo.status === 'in progress')
})
const completedTodos = computed(() => {
  return originTodoList.todoItems.filter(todo => todo.status === 'completed')
})

type SplitedTodoListType = {
  statusName: string
  className: string
  value: TodoItem[]
}[]

const splitedTodoList: Ref<SplitedTodoListType> = ref([
  {statusName: 'No Status',   className: 'nostatus',  value: noStatusTodos,}, 
  {statusName: 'Todo',        className: 'todo',      value: todoTodos,}, 
  {statusName: 'In progress', className: 'inprogress',value: inprogressTodos,}, 
  {statusName: 'Completed',   className: 'completed', value: completedTodos}
])

// action events
ref: loading = false
const handlerDelete = (todo: TodoItem) => {
  loading = true
  for (let i = 0; i < originTodoList.todoItems.length; i++) {
    if (originTodoList.todoItems[i].id === todo.id) {
      dispatch('todo/DELETE_TODOITEM', i)
      return loading = false
    }
  }
}

ref: showTodoView = false
// toggle todo item view
const toggleTodoView = () => {
  showTodoView = !showTodoView
  dispatch('todo/SAVE_DATA')
}

ref: editTodoIndex = -1
let editTodoItem = computed(() => originTodoList.todoItems[editTodoIndex] || {} as TodoItem)

const handlerEdit = (todo: TodoItem) => {
  for (let i = 0; i < originTodoList.todoItems.length; i++) {
    if (originTodoList.todoItems[i].id === todo.id) {
      toggleTodoView()
      return editTodoIndex = i
    }
  }
}

const createTodoItem = (status: string) => {
  // format status to LowerCase
  status = status.toLocaleLowerCase()
  // create default todo
  editTodoIndex = originTodoList.todoItems.length
  const newTodoItem = {
    title: 'Untitled',
    content: '',
    status: status
  }
  // add to store
  dispatch('todo/ADD_TODOITEM', newTodoItem)
  // show item window
  toggleTodoView()
}


const AllOptions = splitedTodoList.value.map((todo, index) => {
  return {
    label: todo.statusName,
    key: todo.statusName.toLocaleLowerCase()
  }
})

const options = computed(() => AllOptions.filter(option => option.key !== editTodoItem.value.status))
// update status
const handleSelect = (key: TodoItem['status']) => {
  editTodoItem.value.status = key
  dispatch('todo/SAVE_DATA')
}


</script>

<style scoped lang="scss">
.title {
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
  .nostatus-card .table-title {
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
.todoitem-wrapper {
  @include abs-margin-center();
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0,0,0,.4);
}
.todoitem-view {
  @include abs-margin-center();
  width: 80%;
  height: 80%;
  z-index: 3;
  background: #fff;
  border: 1px solid #ccc;
  padding: 0 5%;
  box-shadow: 0 0 10px 0 #ccc;
  border-radius: 3px;

  overflow: hidden;
  .status-selector {
    margin-bottom: 20px;
    .text {
      color: #2c3e50;
      font-size: 1.3em;
      background: #d5eef8;
      padding: 2px 10px;
      border-radius: 5px;
    }
  }

  .content {
    width: 100%;
    height: 60%;
    font-size: 1.8em;
    font-weight: 600;
    resize: none;
  }
}

</style>
