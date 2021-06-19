<template>
  <h1>Todo list detail: {{name}}</h1>
  <hr>
  <!-- todolist -->
  <ul class="todolsit">
    <!-- 准备 -->
      <!-- todo-item -->
      <!-- todo-item -->
      <!-- todo-item -->
    <!-- 准备 -->

    <!-- 在流程中 -->
      <!-- todo-item -->
      <!-- todo-item -->
      <!-- todo-item -->
    <!-- 在流程中 -->

    <!-- 已完成 -->
      <!-- todo-item -->
      <!-- todo-item -->
      <!-- todo-item -->
    <!-- 已完成 -->
  </ul>
  <!-- todolist -->

  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps({
  name: {
    type: String,
    required: true
  }
})


</script>

<style scoped>
</style>
