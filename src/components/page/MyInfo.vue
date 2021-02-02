<template>
  <div id="my_info">
      MyInfo
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #my_info{
        @include display-center;        
        width: 83%;
        position: absolute;
        height: 100%;
        z-index: 0;
        left: 17%;
        background: cyan;
    }
</style>