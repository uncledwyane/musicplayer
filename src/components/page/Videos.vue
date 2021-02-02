<template>
  <div id="videos">
      Videos
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #videos{
        @include display-center;
        width: 83%;
        position: absolute;
        height: 100%;
        z-index: 0;
        left: 17%;
        background: yellow;
    }
</style>