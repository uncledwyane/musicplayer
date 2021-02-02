<template>
  <div id="album">
      Album
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #album{
        @include display-center;
        width: 83%;
        position: absolute;
        height: 100%;
        z-index: 0;
        left: 17%;
        background: lightblue;
    }
</style>