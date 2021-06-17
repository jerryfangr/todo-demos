<template>
  <h1>Todo List form</h1>
  <hr>
  <!-- todolist-form -->
    <!-- todolist-item -->
    <!-- todolist-item -->
    <!-- todolist-item -->
  <!-- todolist-form -->
  <div class="form-list">
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排1
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排2
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排3
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排4
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排5
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排6
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排7
    </todo-card>
    <todo-card
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit"
      :openLoading="loading"
    >
      学习安排8
    </todo-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoCard from '@/components/TodoCard.vue'
import { useTodoStore } from '@/hooks'

ref: loading = false

const handlerDelete = () => {
  console.log('handlerDelete')
  loading = true
}

const handlerEdit = () => {
  console.log('handlerEdit')
  loading = false
}

const {dispatch} = useTodoStore()
dispatch('todo/LOAD_DATA')

</script>

<style scoped lang="scss">
  .form-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .card {
      float: left;
      margin-right: 20px;
      margin-bottom: 12px;

    }
  }
</style>
