<template>
  <div class="container">
      <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import 'animate.css'
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
