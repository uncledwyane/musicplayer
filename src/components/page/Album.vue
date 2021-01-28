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
        width: 100%;
        height: 100%;
    }
</style>