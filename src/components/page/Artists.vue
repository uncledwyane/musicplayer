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
        width: 100%;
        position: absolute;
        z-index: 0;
        height: 100%;
        background: pink;
    }
</style>