<template>
  <div id="homepage">
      <div class="hot_playlists">
          <h2>Recommend playlist for you</h2>
      </div>
      <div class="play_info">
          <div class="music_in_playlist"></div>
          <div class="track_play"></div>
      </div>
  </div>
</template>

<script>
import api from '@/api/api'
const api = new api()
export default {
    data () {
        return {
            
        }
    },
    mounted () {
        var self = this;
        api.getHighQualityPlaylist().then(function (res) {
            
        })
    },
    methods: {
        
    },
}
</script>

<style lang='scss' scoped>
    h2{
        margin: 0;
        padding: 0;
    }
    @import '../scss/mixins.scss';
    #homepage{
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }
    .hot_playlists{
        width: 100%;
        height: 40%;
        background: lightpink;
        padding: 0 20px;
    }
    .play_info{
        width: 100%;
        height: 60%;
        background: lightgreen;
    }
</style>