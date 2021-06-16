<template>
  <div class="card"     
    @mouseover="showButton=true"
    @mouseleave="showButton=false"
  >
    {{ 'title' }}

    <n-space v-if="showButton">

      <n-button @click="deleteItem">
        <template #icon>
          <n-icon>
            <edit-icon />
          </n-icon>
        </template>
      </n-button>

      <n-button icon-placement="right">
        <template #icon>
          <n-icon>
            <delete-icon />
          </n-icon>
        </template>
      </n-button>

    </n-space>    
  </div>
</template>

<script setup lang="ts">
  import { NSpace, NButton, NIcon } from 'naive-ui'
  import { Delete28Regular as DeleteIcon, DocumentEdit16Regular as EditIcon } from '@vicons/fluent'
  import { ref, useContext  } from 'vue'
  // import { getCurrentInstance  } from 'vue'
  // import type { ComponentInternalInstance  } from 'vue'
  // const { emit } = getCurrentInstance() as ComponentInternalInstance 



  ref: showButton = false

  const { emit } = useContext()

  const deleteItem = () => {
    emit('deleteEvent');
  }
</script>

<style lang="scss">
  .card {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    border: 1px solid #e4e4e4;
    color: #37352f;
    font-size: 1.6em;
    width: 100%;
    text-indent: 1em;
    // background: #ccc;
  }
</style>