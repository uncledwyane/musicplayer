<template>
  <div id="play_wrap"  :style="{backgroundColor: customTheme.background.color}">
      <div class="track_box"  :style="{backgroundColor: customTheme.background.color}">
            <div class="cover">
              <img :src="songIsPlaying.coverImg" class="cover_img"  :style="{backgroundColor: !songIsPlaying.playState ? customTheme.placehoder.color : ''}">
            </div>
            <div class="track_info">
                <p class="track_name" :style="{backgroundColor: !songIsPlaying.name ? customTheme.placehoder.color : '', color: customTheme.highlight.color}">{{ songIsPlaying.name }}</p>
                <p class="track_artists" :style="{backgroundColor: !songIsPlaying.name ? customTheme.placehoder.color : ''}">{{ songIsPlaying.artists }}</p>
            </div>
            <div class="track_time"></div>
            <div class="track_durtime"></div>
      </div>
      <div class="control_box">
          <div class="previous_track">
              <i class="fa fa-angle-double-left" @click="previousTrack" :style="{color: customTheme.highlight.color}"></i>
          </div>
          <div class="pause_or_play">
              <i class="fa fa-play" v-show="songIsPlaying.state == 'pause'" @click="playOrPause('play')" :style="{color: customTheme.highlight.color}"></i>
              <i class="fa fa-pause" v-show="songIsPlaying.state == 'play'" @click="playOrPause('pause')" :style="{color: customTheme.highlight.color}"></i>
          </div>
          <div class="next_track">
              <i class="fa fa-angle-double-right" @click="nextTrack" :style="{color: customTheme.highlight.color}"></i>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import bus from '@/components/bus'
export default {
    data () {
        return {
            musicEle: null,
            currentTrackList: null
        }
    },
    computed: ({
        ...mapState([
            'songIsPlaying',
            'customTheme',
            'trackListIds',
            'trackList'
        ])
    }),
    mounted () {
        var self = this;
        self.musicEle = document.getElementById('musicAudio');
        bus.$on('nextSong', function(){
            self.nextTrack()
        })
    },
    methods: {
        ...mapMutations(['updatePlayingTrack']),
        playOrPause(value){
            var self = this;
            if(self.songIsPlaying.id){
                if(value == 'pause'){
                    self.updatePlayingTrack({
                        state: 'pause',
                        playState: false
                    })
                    bus.$emit('changePlayState', 'pause');
                }else{
                    self.updatePlayingTrack({
                        state: 'play',
                        playState: true
                    })
                    bus.$emit('changePlayState', 'play');
                }
            }
        },
        previousTrack(){
            var self = this;
            var previousIndex;
            if(self.songIsPlaying.name){
                console.log(':::切换上一曲，当前播放歌曲id：', self.songIsPlaying.id);
                console.log(':::切换上一曲，当前播放列表ids：', self.trackListIds);
                var currPlaySongId = self.songIsPlaying.id;
                var currSongIdIndex = self.trackListIds.indexOf(currPlaySongId);
                if(currSongIdIndex > 0){
                    previousIndex = currSongIdIndex - 1;
                }else{
                    previousIndex = self.trackListIds.length - 1;
                }
                console.log(':::切换上一曲，获取到前面的歌曲index：', previousIndex);
                console.log(':::切换上一曲，获取到上一播放歌曲id：', self.trackListIds[previousIndex]);
                self.trackList.forEach(function(track){
                    if(track.id == self.trackListIds[previousIndex]){
                        bus.$emit('playSearchSong', track);
                    }
                })
            }
        },
        nextTrack(){
            var self = this;
            var nextIndex;
            if(self.songIsPlaying.name){
                console.log(':::切换下一曲，当前播放歌曲id：', self.songIsPlaying.id);
                console.log(':::切换下一曲，当前播放列表ids：', self.trackListIds);
                var currPlaySongId = self.songIsPlaying.id;
                var currSongIdIndex = self.trackListIds.indexOf(currPlaySongId);
                if(currSongIdIndex >= 0){
                    if(currSongIdIndex == self.trackListIds.length - 1){
                        nextIndex = 0;
                    }else{
                        nextIndex = currSongIdIndex + 1;
                    }
                }
                console.log(':::切换下一曲，获取到前面的歌曲index：', nextIndex);
                console.log(':::切换下一曲，获取到下一播放歌曲id：', self.trackListIds[nextIndex]);
                self.trackList.forEach(function(track){
                    if(track.id == self.trackListIds[nextIndex]){
                        bus.$emit('playSearchSong', track);
                    }
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../scss/theme.scss';
    h2, p{
        margin: 0px;
        padding: 0px;
    }
    #play_wrap{
        width: 100%;
        height: 90%;
        background: $front-color-dark;
        box-sizing: border-box;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
        /* justify-content: center; */
        align-items: center;
    }
    .track_box{
        width: 65%;
        /* background: lightgreen; */
        height: 75%;
        margin: 0px auto;
        padding: 10px;
        box-sizing: border-box;
        background: $front-color-dark;
        position: relative;
        top: 20px;
        border-radius: 20px;
    }
    .cover{
        width: 100%;
        display: flex;
        height: 70%;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        margin-bottom: 10px;
    }
    .track_info{
        height: 30%;
        width: 100%;
        justify-content: center;
        /* display: flex; */
        text-align: center;
    }
    .track_name{
        color: $font-highlight-color-dark;
        width: 100%;
        height: 20px;
    }
    .track_artists{
        color:$font-color-dark;
        font-size: 12px;
        width: 50%;
        height: 20px;
        margin: 5px auto;
    }
    .control_box{
        width: 80%;
        height: 15%;
        /* margin: 0 auto; */
        position: absolute;
        bottom: 0;
        display: flex;
    }
    h2{
        height: 5%;
        margin: 10px 0px;
    }
    .cover_img{
        width: 70%;
        min-height: 100%;
        border-radius: 50%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    .previous_track, .pause_or_play, .next_track{
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        align-items: center;
        color: #bebebe;
        font-size: 25px;
        transition: all ease .3s;
    }
    .pause_or_play{
        justify-content: center;
    }
    .previous_track{
        justify-content: flex-end;
    }
    .next_track{
        justify-content: flex-start;
    }
    .pause_or_play:hover, .previous_track:hover, .next_track:hover{
        cursor: pointer;
    }
</style>