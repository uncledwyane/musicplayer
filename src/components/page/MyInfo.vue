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
        width: 100%;
        height: 100%;
    }
</style>