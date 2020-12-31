<template>
  <div id="playlistWrap">
      <div class="playlistWrap">
          <h3>{{ title }}</h3>
          <div class="playWrap">
            <div class="play">
              
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import bus from '@/components/bus'
export default {
    props: ['playlist'],
    data(){
        return {
            title: ''
        }
    },
    mounted(){
      var playlistWrap = document.getElementById('playlistWrap');
      playlistWrap.addEventListener('click', function (e){
        if(e.target.id == 'playlistWrap'){
          bus.$emit('hidePlaylist', true)
        }
      })
    },
    methods: {
      hidePlaylist(){
        bus.$emit('hidePlaylist', true)
      }
    }
}
</script>

<style lang='scss' scoped>
  #playlistWrap{
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .playlistWrap{
      width: 335px;
      background: #fff;
      height: 500px;
      border-radius: 15px;
      position: relative;
      box-shadow: 0 0 20px rgba(0,0,0,.1);
    }
  }
</style>