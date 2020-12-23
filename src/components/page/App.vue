<template>
  <div id="app">
      {{ msg }}
          <v-btn color="primary">Primary</v-btn>
          <v-icon large color="green darken-2">mdi-domain</v-icon>
  </div>
</template>

<script>
export default {
    data(){
        return {
            msg: 'APP'
        }
    }
}
</script>

<style>

</style>