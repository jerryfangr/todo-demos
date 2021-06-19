<template>
  <!-- header start -->
  <title>Todo List form</title>
  <n-button 
    inline
    style="font-size: 2.5em; margin-left: 30px;" 
    color="#83837d"
    ghost
    dashed
    
  >
    + 
  </n-button>
  <hr>
  <!-- header end -->

  <!-- content start -->
  <div class="form-list">
    <todo-card
      v-for="count in 20"
      @deleteEvent="handlerDelete"
      @editEvent="handlerEdit($event, count)"
      :openLoading="loading"
      :key="count"
    >
      学习安排 {{ count }}
    </todo-card>
  </div>
  <!-- content end -->

  <!-- form creator start -->
  <div class="form-creator" v-show="showCreator">
    <input 
      type="text" 
      class="title" 
      v-model="formTitle" 
      placeholder="Untitled">
    <n-button @click="">
      SAVE
    </n-button>
  </div>
  <!-- form creator end -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoCard from '@/components/TodoCard.vue'
import { NButton, NIcon } from 'naive-ui'
import { Add12Filled as AddIcon } from '@vicons/fluent'
import { useTodoStore } from '@/hooks'
import { useRouter, useRoute } from 'vue-router'

ref: loading = false
ref: showCreator = false
ref: formTitle = ''

const router = useRouter()
const route = useRoute()


const handlerDelete = () => {
  console.log('handlerDelete')
  loading = true
}

const handlerEdit = (e: unknown, name: string | number) => {
  console.log('handlerEdit: ', name)
  router.push({
    name: 'todolist',
    params: {
      name: name
    }
  })
  loading = false
}

const {dispatch} = useTodoStore()
dispatch('todo/LOAD_DATA')

</script>


<style scoped lang="scss">
  .form-list {
    width: 100%;
    display: grid;
    grid-gap:12px 15px;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 260px);
  }
</style>
