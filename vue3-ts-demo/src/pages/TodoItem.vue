<template>
  <title>Todo Item detail</title>
  
  <div class="content">
    <textarea name="" id="" cols="30" rows="10">
      
    </textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '@/hooks'

const {state, getters} = useTodoStore()

const router = useRouter()
if (getters['todo/currentTodoList'] === undefined) {
  router.push({path: '/'})
}

</script>

<style scoped>
</style>
