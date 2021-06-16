<template>
  <h1>Home Page</h1>
  <!-- todolist-form -->
    <!-- todolist-item -->
    <!-- todolist-item -->
    <!-- todolist-item -->
  <!-- todolist-form -->
  <todo-card></todo-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoCard from '@/components/TodoCard.vue'
import { useTodoStore } from '@/hooks'

console.log('Home');

const {dispatch} = useTodoStore()
dispatch('todo/LOAD_DATA')
</script>

<style scoped>

</style>
