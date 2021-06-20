<template>
  <div :class="{'container': true, 'dark': darkMode}">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <n-config-provider :theme="darkMode=== true ? darkTheme : undefined">
      <router-view></router-view>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useTodoStore } from '@/hooks'
const { state, getters, dispatch, commit} = useTodoStore()

ref: darkMode = computed(() => {
  return state.scene.isDarkMode
})

setTimeout(() => {
  // commit('scene/toggleDarkMode')
  console.log(state.scene)
}, 2000)

// DEBUG: force reload
// setInterval(() => {
//   location.reload()
// }, 8 * 1000)
</script>

<style lang="scss">
@import "@/styles/common.scss";

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  min-height: 100%;
  // background: #ccc;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 0 6%;
  box-sizing: border-box;

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    &.dark {
      background: #101014;
      color: #fff;
    }
  }
}
</style>
