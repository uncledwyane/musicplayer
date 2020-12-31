<template>
  <div class="playDetailWrap">
      <div class="playlistInfo" ref='playlistInfo' :style="{background: 'url(' + coverImgUrl + ')', backgroundSize: 'contain', backgroundRepeat:'no-repeat'}">
          <div class="cover"><img :src="coverImgUrl" alt="" class="coverImg"></div>
          <div class="creator">
              <h3 class="playlistName">{{ name }}</h3>
              <p class="creatorName"><img :src="creator.avatarUrl" class="creatorHeader"> {{ creator.nickname }}</p>
              <p class="playlistDescription">{{ description }}</p>
          </div>
      </div>
      <div class="playlistTracks">
          <mu-button color='red' round><mu-icon value='play_arrow'></mu-icon>播放全部</mu-button>
          <div class="tracksWrap">
              <div class="track" v-for="(track, index) in tracks" :key="track.id">
                  <div class="index">{{ index + 1 }}</div>
                  <div class="trackInfo">
                      <h4 class="trackName">{{ track.name }}</h4>
                      <p class="artistName">{{ track.ar | formatArtist(track.ar)}}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import RestAPI from '@/api/restAPI'
const restAPI = new RestAPI()
export default {
    data(){
        return {
            playId: '',
            creator: '',
            subscribers: '',
            tracks: '',
            coverImgUrl: '',
            playCount: 0,
            tags: [],
            description: '',
            name: '',
            privileges: ''
        }
    },
    filters: {
        formatArtist(artists){
            var artistNames = [];
            for(var i = 0; i < artists.length; i++){
                artistNames.push(artists[i].name);
            }
            return artistNames.toString();
        }
    },
    created(){
        var self = this;
        self.playId = self.$route.params.id;
        restAPI.getPlayListDetail(self.playId).then(function (res){
            self.creator = res.playlist.creator;
            self.subscribers = res.playlist.subscribers;
            self.tracks = res.playlist.tracks;
            self.tags = res.playlist.tags;
            self.description = res.playlist.description;
            self.name = res.playlist.name;
            self.coverImgUrl = res.playlist.coverImgUrl;
            self.playCount = res.playlist.playCount;
            self.privileges = res.privileges;
        })
    }
}
</script>

<style lang='scss' scoped>
    #playDetailWrap{
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    
    .playlistInfo{
        width: 100%;
        display: flex;
    }
    .cover{
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .creator{
        width: 70%;
    }
    
    .coverImg{
        width: 70px;
        height: 70px;
        border-radius: 10px;
    }
    
    .creatorHeader{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
    }   
    .playlistName{
        margin: 40px 0 0 0;
        overflow: hidden;
        height: 20px;
    }
    .creatorName{
        height: 40px;
        margin: 0;
        display: inline-flex;
        line-height: 40px;
        font-size: 12px;
        align-items: center;
    }
    .playlistDescription{
        font-size: 12px;
        margin: 0;
        overflow: hidden;
        height: 53px;
        display: flex;
        justify-content: space-between;
    }
    p{
        margin: 0;
    }
    .playlistTracks{
        width: 100%;
        height: 80%;
    }
    .tracksWrap{
        width: 90%;
        background: #fff;
        border-radius: 10px;
        margin: 20px auto;
    }
    .track{
        width: 100%;
        height: 40px;
        display: flex;
        margin-bottom: 10px;
    }
    .index{
        width: 10%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: grey;
    }
    .trackInfo{
        width: 90%;
        height: 40px;
        h4{
            margin: 0;
        }
    }
    .trackName{
        width: 100%;
        height: 28px;
        line-height: 28px;
    }
    .artistName{
        width: 100%;
        text-align: left;
        height: 12px;
        font-size: 12px;
        line-height: 12px;
    }
</style>