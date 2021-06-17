<template>
  <div 
    class="card"
    :style="cardStyle"   
    @mouseover="showButton=true"
    @mouseleave="showButton=false"
    @click="editItem"
  >

    <div class="text">
        <slot></slot>
    </div> 

    <div class="operate" v-show="showButton">
      <n-button 
        size="tiny"
        @click="deleteItem"
        color="#FFF"
        :loading="openLoading"
      >
        <n-icon v-if="!openLoading"><delete-icon /></n-icon>
      </n-button>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { NButton, NIcon } from 'naive-ui'
  import { Delete28Regular as DeleteIcon, DocumentEdit16Regular as EditIcon } from '@vicons/fluent'
  import { ref, useContext, defineProps  } from 'vue'
  // import { getCurrentInstance  } from 'vue'
  // import type { ComponentInternalInstance  } from 'vue'
  // const { emit } = getCurrentInstance() as ComponentInternalInstance 

  defineProps({
    openLoading: {
      type: Boolean,
      default: false
    }, 
    cardStyle: {
      type: String,
      default: ''
    }
  })

  ref: showButton = false

  const { emit } = useContext()

  ref: hasDeleted = false

  // click delete button event
  const deleteItem = (e: MouseEvent) => {
    e.stopPropagation()
    if (!hasDeleted) {
      hasDeleted = true
      emit('deleteEvent', e)
    }
  }

  // click edit button event
  const editItem = (e: MouseEvent) => {
    emit('editEvent', e);
  }
</script>

<style lang="scss" scoped>
  .card {
    height: 40px;
    width: 260px;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #dfdfdf;
    color: #585856;
    font-size: 16px;
    font-weight: bold;
    transition: background .2s;
    border-radius: 3px;
    padding: 0 12px;
    box-shadow: 0 0 2px 0 #d2d2d2;
    
    &:hover {
      background: #f9f9f8;
      cursor: pointer;
    }

    div {
      margin: 0;
      padding: 0;
    }
    
    .text {
      flex-grow: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .operate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: appear .3s ease-in-out;
      & ::v-deep(.n-button) {
        background: #fff;
        color: #575654;
        border: 1px solid #d1d1d1;
        height: 26px;
        width: 26px;
        box-shadow: 0 0 2px 0 #d1d1d1;

        .n-button__icon {
          margin: 0;
        }

        &:hover {
          background: #efefee;
        }
      }
    }


    @keyframes appear {
      0% { 
        opacity: 0; 
      }
      100% { 
        opacity: 1; 
      }
    }
  }
</style>