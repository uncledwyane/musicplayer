<template>
  <div id="homepage">
      <div class="hot_playlists">
          <div class="title">
              <h2>Recommend playlist for you</h2>
              <div class="change_playlist">
                  <i class="fa fa-angle-left" @click="updatePlaylist('previous')"></i>
                  <i class="fa fa-angle-right" @click="updatePlaylist('next')"></i>
              </div>
          </div>
          <div class="playlist">
              <div class="playlist_item" v-for="playlist in playlistShow" :key="playlist.id">
                  <div class="playlist_cover">
                      <img :src="playlist.coverImgUrl" :alt="playlist.id" class="cover_img">
                  </div>
                  <div class="playlist_info">
                      <p class="playlist_name">{{ playlist.name }}</p>
                      <p class="playlist_count">{{ playlist.trackCount }}首</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="play_info">
          <div class="music_in_playlist"></div>
          <div class="track_play"></div>
      </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapMutations, mapState } from 'vuex'
const myApi = new api()
export default {
    computed: mapState([
        'highQualityPlaylist'
    ]),
    data () {
        return {
            playlistShow: null, // 要显示在界面上的歌单，防止全部歌单显示浪费资源
            minIndex: 0,
            maxIndex: 6,
            showNum: 6 // 要显示在界面上的最多歌单数
        }
    },
    mounted () {
        var self = this;
        if(!self.highQualityPlaylist){
            myApi.getHighQualityPlaylist().then(function (res) {
                self.setHighQualityPlaylist(res.playlists);
                self.playlistFilter(self.minIndex, self.maxIndex);
                console.log(new Date(), ' ::: 获取精品歌单成功： ', res);
            })
        }
        
    },
    methods: {
        ...mapMutations([
            'setHighQualityPlaylist'
        ]),
        
        playlistFilter(min, max){
            var self = this;
            var tempArray = new Array();
            self.highQualityPlaylist.forEach(function (playlist, index){
                if(index >= min && index <= max){
                    tempArray.push(playlist);
                }
            })
            self.playlistShow = tempArray;
        },
        updatePlaylist(val){
            var self = this;
            if(val == 'previous'){
                if(self.minIndex == 0 || self.minIndex - self.showNum <= 0){
                    console.log(new Date(), `:::不能往前翻页了, min: ${self.minIndex} max: ${self.maxIndex}`);
                    return;
                }else{
                    self.minIndex -= self.showNum;
                    self.maxIndex -= self.showNum;
                    self.playlistFilter(self.maxIndex, self.maxIndex);
                    console.log(new Date(), `:::往前翻页, min: ${self.minIndex} max: ${self.maxIndex}`);
                }
            }else{
                var playlistLength = self.highQualityPlaylist.length;
                if(self.maxIndex > self.playlistLength){
                    console.log(new Date(), `:::不能往后翻页了, min: ${self.minIndex} max: ${self.maxIndex}`);
                    return;
                }else{
                    if(self.maxIndex + self.showNum > playlistLength || self.maxIndex + self.showNum <= playlistLength){
                        self.maxIndex = playlistLength;
                        self.minIndex += self.showNum;
                        console.log(new Date(), `:::往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`);
                    }else{
                        self.maxIndex += self.showNum;
                        self.minIndex += self.showNum;
                        console.log(new Date(), `:::往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`);
                    }
                }
            }
        }
    },
}
</script>

<style lang='scss' scoped>
    h2,p{
        margin: 0;
        padding: 0;
    }
    @import '../scss/mixins.scss';
    #homepage{
        display: flex;
        width: 83%;
        height: 100%;
        position: absolute;
        flex-direction: column;
        z-index: 0;
    }
    .hot_playlists{
        width: 100%;
        height: 34%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        background: #fff;
    }
    .playlist{
        display: flex;
    }
    .playlist_item{
        width: 130px;
        height: 230px;
        margin-right: 20px;
    }
    .playlist_cover{
        width: 130px;
        height: 155px;
        @include display-center;
    }
    .playlist_count{
        color: #a1aac7;
    }
    .playlist_cover:hover{
        cursor: pointer;
    }
    .playlist_info{
        position: relative;
        top: -10px;
    }
    .cover_img{
        width: 130px;
        height: 130px;
        border-radius: 10px;
    }
    .title{
        display: flex;
        align-items: center;
        position: relative;
    }
    .change_playlist{
        position: absolute;
        right: 50px;
    }
    .fa{
        font-size: 25px;
        color: #a1aac7;
        transition: all ease .3s;
    }
    .fa:hover{
        color: #254cda ;
        cursor: pointer;
    }
    .fa-angle-left{
        margin-right: 20px;
    }
    .play_info{
        width: 100%;
        height: 66%;
        background: lightgreen;
    }

</style>