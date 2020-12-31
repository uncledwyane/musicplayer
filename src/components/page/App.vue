<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  
export default {
}
</script>

<style lang='scss' scoped>
  #app{
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    z-index: -1;
    overflow: hidden;
  }
</style>