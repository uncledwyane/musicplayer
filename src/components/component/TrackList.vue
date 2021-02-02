<template>
    <div id="track_list">
        <div class="track_item" v-for="(track, index) in tracks" :key="track.id">
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
                <span class="song_time">3:25</span>
            </div>
            <div class="track_play">
                <span
                    class="play_state"
                    @click="
                        {
                            playingState == true ? playOrPause(track) : play(track);
                        }
                    "
                    :class="{
                        play_state_play: playingState == true,
                        play_state_pause: playingState == false,
                    }"
                ></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            playingState: false,
        };
    },
    computed: {
        ...mapState({
            tracks: "trackList",
            songIsPlaying: "songIsPlaying",
        }),
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
    },
    methods: {
        ...mapMutations(["setPlayingTrack"]),
        playOrPause() {
            var self = this;
            self.playingState = !self.playingState;
        },
        play(track) {
            var self = this;
            self.playingState = true;
        },
        pause(track) {
            var self = this;
            self.playingState = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
#track_list {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.track_item {
    width: 98%;
    height: 50px;
    display: flex;
    background: #fff;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
}
.track_order {
    width: 5%;
    @include display-center;
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
}
.track_artists {
    width: 30%;
    display: flex;
    color: #a1aac7;
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
}
.play_state_play {
    background: url("assets/img/pause.png") center center no-repeat;
    background-size: contain;
}
.play_state_pause {
    background: url("assets/img/play.png") center center no-repeat;
    background-size: contain;
}
</style>
