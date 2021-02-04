<template>
    <div id="track_list">
        <div class="track_item" v-for="(track, index) in tracks" :key="track.id" :class="{track_isplaying: track.id == songIsPlaying.id && playingState}" @click="playOrPause('play', track)">
            <div class="track_order">
                <span class="order_num">{{ index + 1 }}</span>
            </div>
            <div class="track_cover">
                <img class="trackcover_img" :src="track.al.picUrl" />
            </div>
            <div class="track_name">
                <span class="song_name">{{ track.al.name }}</span>
            </div>
            <div class="track_artists">
                <span class="artists">{{ track.ar | trackArtistsFilter(track.ar) }}</span>
            </div>
            <div class="track_time">
                <span class="song_time">{{ track.dt | trackTimeFilter(track.dt) }}</span>
            </div>
            <div class="track_play">
                <span
                    class="play_state"
                    :class="{
                        play_state_play:
                            playingState == true && track.id == songIsPlaying.id,
                        play_state_pause:
                            playingState == false && track.id == songIsPlaying.id,
                    }"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import API from '@/api/API'
import bus from '@/components/bus'
const api = new API()
export default {
    data() {
        return {
            playingState: false,
            musicEle: null,
        };
    },
    computed: {
        ...mapState({
            tracks: "trackList",
            songIsPlaying: "songIsPlaying",
        }),
    },
    mounted() {
        var self = this;
        self.musicEle = document.getElementById("musicAudio");
        bus.$on('changePlayState', function (state){
            console.log('组件切换状态， ', state);
            self.playingState = state;
            if(state == 'pause'){
                self.musicEle.pause();
                self.updatePlayingTrack({
                    playState: false
                })
            }else{
                self.musicEle.play();
                self.updatePlayingTrack({
                    playState: false
                })
            }
        })
    },
    filters: {
        trackArtistsFilter(artists) {
            var self = this;
            if (!artists) {
                return "没有歌手";
            } else {
                var tempArray = new Array();
                for (var i = 0; i < artists.length; i++) {
                    tempArray.push(artists[i].name);
                }
                var temp = tempArray.toString();
                var final = temp.substr(0, temp.length);
                return final;
            }
        },
        trackTimeFilter(time){
            var tempTime = time.toString();
            var seconds = tempTime.substr(0, 3); // 截取前面三位，为秒
            var mSeconds = tempTime.substr(3, 3); // 截取后面三位，为不满一秒的
            var toMinites = (seconds / 60).toString().split('.')[0];
            var toSeconds = seconds - (toMinites * 60)
            if(toSeconds < 10){
                toSeconds = '0' + toSeconds;
            }
            var finalTime = toMinites + ':' + toSeconds;
            return finalTime; 
        }
    },
    methods: {
        ...mapMutations(["setPlayingTrack", "updatePlayingTrack"]),
        playOrPause(state, track) {
            console.log(`暂停或者播放： 把 ${track.name}切换为 ${state}`);
            var self = this;
            var tempObj = {
                id: track.id,
                name: track.name,
                coverImg: track.al.picUrl,
                state: "",
                drtime: track.dt,
                playUrl: "",
                artists: self.formatTrackArtists(track.ar)
            };
            if (self.songIsPlaying.id && self.songIsPlaying.id != track.id || !self.songIsPlaying.id) {
                api.getSongUrl(track.id).then(function (res) {
                    tempObj.state = "play";
                    tempObj.playUrl = res.data[0].url;
                    self.musicEle.src = tempObj.playUrl;
                    self.musicEle.play();
                    self.playingState = true;
                    self.updatePlayingTrack({
                        playState: true
                    })
                    self.setPlayingTrack(tempObj);
                })
            } else {
                if(self.songIsPlaying.id == track.id && self.songIsPlaying.playUrl){
                    console.log(`当前点击的是同一首歌，切换状态为 ${state}`);
                    if (state == "pause") {
                        self.musicEle.pause();
                        self.playingState = false;
                        self.updatePlayingTrack({
                            state: 'pause',
                            playState: false
                        });
                    } else {
                        self.musicEle.play();
                        self.playingState = true;
                        self.updatePlayingTrack({
                            state: 'play',
                            playState: true
                        });
                    }
                }
            }
        },
        formatTrackArtists(artists){
            var tempArray = new Array();
            for (var i = 0; i < artists.length; i++) {
                tempArray.push(artists[i].name);
            }
            var temp = tempArray.toString();
            var final = temp.substr(0, temp.length);
            return final;
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import '../scss/theme.scss';
#track_list {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-bottom: 20px;
}
.track_item {
    width: 98%;
    height: 50px;
    display: flex;
    background: $front-color-dark;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
    box-sizing: border-box;
    border-radius: 6px;
}
.track_item:hover{
    border-left: 5px solid $font-highlight-color-dark;
}
.track_order {
    width: 5%;
    @include display-center;
    color: #fff;
}
.track_cover {
    display: flex;
    width: 10%;
    align-items: center;
    justify-content: center;
    @include display-center;
}
.track_name {
    width: 30%;
    display: flex;
    justify-content: flex-start;
    color: #fff;
}
.track_artists {
    width: 30%;
    display: flex;
    color: #afafaf;
    justify-content: flex-start;
}
.track_time {
    width: 15%;
    color: #a1aac7;
    @include display-center;
}
.track_play {
    width: 10%;
    @include display-center;
}
.trackcover_img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.play_state {
    display: block;
    width: 32px;
    height: 32px;
    transition: all ease 0.3s;
    cursor: pointer;
    background: url("assets/img/play.png") center center no-repeat;
    background-size: contain;
}
.play_state_play {
    background: url("assets/img/pause.png") center center no-repeat;
    background-size: contain;
}
.play_state_pause {
    background: url("assets/img/play.png") center center no-repeat;
    background-size: contain;
}
.track_isplaying{
    border-left: 5px solid $font-highlight-color-dark;
}
</style>
