<template>
  <div id="artists">
      Artists
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #artists{
        @include display-center;
        width: 83%;
        position: absolute;
        left: 17%;
        z-index: 0;
        height: 100%;
        background: pink;
    }
</style>