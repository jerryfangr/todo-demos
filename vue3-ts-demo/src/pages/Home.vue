<template>
  <!-- header start -->
  <title>Todo List form</title>
  <n-button 
    inline
    style="font-size: 2.5em; margin-left: 30px; width: 40px;" 
    color="#83837d"
    ghost
    dashed
    @click="toggleCreator"
  >
    <n-icon>
      <sub-icon v-if="showCreator"/>
      <add-icon v-else/>
    </n-icon>
  </n-button>
  <hr>
  <!-- header end -->

  <!-- content start -->
  <div class="form-list">
    <todo-card
      v-for="(todoList, index) in todoData"
      @deleteEvent="handlerDelete($event, index)"
      @editEvent="handlerEdit($event, index)"
      :openLoading="loading"
      :key="todoList.id"
    >
      {{ todoList.title }}
    </todo-card>
  </div>
  <!-- content end -->

  <!-- form creator start -->
  <div 
    class="form-creator animate__animated animate__bounceIn animate__faster" 
    v-show="showCreator"
  >
    <input 
      type="text" 
      class="title" 
      v-model="formTitle" 
      placeholder="Untitled">

    <n-button 
      size="large" 
      style="width: 80%; font-size: 1.5em;"
      color="#757575"
      ghost
      @click="createTodoList"
    >Create</n-button>

  </div>
  <!-- form creator end -->
</template>

<script setup lang="ts">
// components
import TodoCard from '@/components/TodoCard.vue'
import { NButton, NIcon } from 'naive-ui'
import { Add12Regular as AddIcon, Subtract20Filled as SubIcon } from '@vicons/fluent'
// local
import { ref, computed } from 'vue'
import { useTodoStore } from '@/hooks'
import { useRouter } from 'vue-router'

// loading data from localStorage
const {state, dispatch, commit} = useTodoStore()
dispatch('todo/LOAD_DATA')

ref: loading = false // delete loding animation
ref: showCreator = false
ref: formTitle = ''

const todoData = computed(() => state.todo.todoData);

// delete action
const handlerDelete = (e: unknown, index: number) => {
  loading = true
  dispatch('todo/DELETE_TODOLIST', index)
  loading = false
}

// edit action: open todolistpage
const router = useRouter()
const handlerEdit = (e: unknown, index: number) => {
  console.log('handlerEdit: ')
  commit('todo/SWITCH_TODOLIST', index)
  const todoList = todoData.value[index]
  router.push({
    name: 'todolist',
    params: {
      name: todoList.title
    }
  })
}

// toggle creator window
const toggleCreator = () => {
  showCreator = !showCreator
}

// create todolist
const createTodoList = () => {
  const newTodoList = {
    title: formTitle || 'Untitled',
    todoItems: []
  }
  dispatch('todo/ADD_TODOLIST', newTodoList)
  formTitle = ''
}
</script>


<style scoped lang="scss">
  .form-list {
    width: 100%;
    display: grid;
    grid-gap: 12px 15px;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 260px);
  }
  .form-creator {
    @include abs-margin-center();
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    height: 140px;
    box-sizing: border-box;
    border: 1px solid #dfdfdf;
    box-shadow: 0 0 2px 0 #d2d2d2;
    padding: 0 10px;
    padding-bottom: 10px;

    .title {
      width: 100%;
      height: 50px;
      font-size: 1.6em;
      font-weight: 600;
      // text-indent: 5px;
      text-align: center;
      color: #444343;
    }
  }
</style>
