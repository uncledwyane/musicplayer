<template>
  <div id="browse">
      Browse
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #browse{
        @include display-center;
        width: 83%;
        position: absolute;
        z-index: 0;
        height: 100%;
        left: 17%;
        background: indigo;
    }
</style>