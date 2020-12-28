<template>
  <div id="profileWrap">
      <img :src="avatarUrl" alt="Avatar" class="avatar">
      {{nickname}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            nickname: localStorage.getItem('nickname'),
            avatarUrl: localStorage.getItem('avatarUrl'),
        }
    }
}
</script>

<style lang='scss' scoped>
    #profileWrap{
        background: rgba(0,0,0,.1);
        width: 100%;
        height: 100vh;
        .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
</style>