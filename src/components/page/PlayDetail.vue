<template>
    <div class="playDetailWrap">
        <div
            class="playlistInfo"
            ref="playlistInfo"
            :style="{
                background: 'url(' + coverImgUrl + ')',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundWidth: '100%'
            }"
        >
            <div class="cover"><img :src="coverImgUrl" alt="" class="coverImg" /></div>
            <div class="creator">
                <h3 class="playlistName">{{ name }}</h3>
                <p class="creatorName">
                    <img :src="creator.avatarUrl" class="creatorHeader" />
                    {{ creator.nickname }}
                </p>
                <p class="playlistDescription">{{ description }}</p>
            </div>
        </div>
        <div class="playlistTracks">
            <div class="tracksWrap">
                <mu-button color="red" round class="playAllButton"
                    ><mu-icon value="play_arrow"></mu-icon>播放全部</mu-button
                >
                <div
                    class="track"
                    :class="
                        track.id == songIsPlaying.songId && songIsPlaying.isPlaying
                            ? 'track_playing'
                            : ''
                    "
                    v-for="(track, index) in tracks"
                    :key="track.id"
                    @click="sendTrackInfoToPlay(track)"
                >
                    <div class="index">{{ index + 1 }}</div>
                    <div class="trackInfo">
                        <h4 class="trackName">{{ track.name }}</h4>
                        <p class="artistName">{{ track.ar | formatArtist(track.ar) }}</p>
                    </div>
                    <div class="playAction" v-show="track.id == songIsPlaying.songId">
                        <img
                            :src="
                                songIsPlaying.isPlaying
                                    ? require('../../../assets/icon/pause.svg')
                                    : require('../../../assets/icon/play.svg')
                            "
                            class="playStatus"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RestAPI from "@/api/restAPI";
import {formatArtist} from '@/components/filter';
const restAPI = new RestAPI();
import bus from "@/components/bus";
export default {
    data() {
        return {
            playId: "",
            creator: "",
            subscribers: "",
            tracks: "",
            coverImgUrl: "",
            playCount: 0,
            tags: [],
            description: "",
            name: "",
            privileges: "",
            iconImg: "assets/img/Play.png",
            songIsPlaying: {
                songId: "",
                songName: "",
                isPlaying: false,
            },
        };
    },
    filters: {
        formatArtist
    },
    created() {
        var self = this;
        self.playId = self.$route.params.id;
        restAPI.getPlayListDetail(self.playId).then(function (res) {
            self.creator = res.playlist.creator;
            self.subscribers = res.playlist.subscribers;
            self.tracks = res.playlist.tracks;
            self.tags = res.playlist.tags;
            self.description = res.playlist.description;
            self.name = res.playlist.name;
            self.coverImgUrl = res.playlist.coverImgUrl;
            self.playCount = res.playlist.playCount;
            self.privileges = res.privileges;
        });
    },
    mounted() {
        var self = this;
        bus.$on("pauseOrPlay", function (value) {
            if (value == "pause") {
                self.songIsPlaying.isPlaying = false;
            } else if (value == "play") {
                self.songIsPlaying.isPlaying = true;
            } else {
            }
        });
    },
    methods: {
        sendTrackInfoToPlay(track) {
            var self = this;
            var songObj = {
                songId: track.id,
                songName: track.name,
                isPlaying: true,
            };
            bus.$emit("pushTrackInfo", track);
            bus.$emit("setPlayPreviewStatus", true);
            // 更新正在播放的歌曲
            bus.$emit("setPlayingSong", songObj);
            // 设置正在播放的歌曲
            self.songIsPlaying.songId = songObj.songId;
            self.songIsPlaying.songName = songObj.songName;
            self.songIsPlaying.isPlaying = songObj.isPlaying;
        },
    },
};
</script>

<style lang="scss" scoped>
.playDetailWrap {
    width: 100%;
    height: 100vh;
    padding-bottom: 50px;
    overflow: scroll;
}

.playlistInfo {
    width: 100%;
    display: flex;
    padding: 20px;
}
.cover {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.creator {
    width: 70%;
}

.coverImg {
    width: 70px;
    height: 70px;
    border-radius: 10px;
}

.creatorHeader {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
}
.playlistName {
    overflow: hidden;
    margin: 5px;
    height: 20px;
}
.creatorName {
    height: 20px;
    margin: 0;
    display: inline-flex;
    line-height: 20px;
    font-size: 12px;
    align-items: center;
}
.playlistDescription {
    font-size: 12px;
    margin: 0;
    overflow: hidden;
    height: 53px;
    display: flex;
    justify-content: space-between;
}
p {
    margin: 0;
}
.playlistTracks {
    width: 100%;
    height: 80%;
    position: relative;
    margin-top: 50px;
    padding-bottom: 130px;
}
.tracksWrap {
    width: 90%;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto;
}
.track {
    width: 100%;
    height: 50px;
    display: flex;
    margin-bottom: 10px;
    padding: 5px 0;
}
.track:hover {
    background: lightgrey;
}
.track:active {
    background: lightgrey;
}
.index {
    width: 10%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: grey;
}
.trackInfo {
    width: 75%;
    height: 40px;
    overflow: hidden;
    h4 {
        margin: 0;
    }
}
.trackName {
    width: 100%;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
}
.artistName {
    width: 100%;
    text-align: left;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
}
.playAllButton {
    position: absolute;
    top: -40px;
    right: 20px;
}
.playAction {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    .playStatus {
        width: 30px;
        height: 30px;
    }
}
.track_playing {
    color: rgb(255, 0, 0);
    border-left: 5px solid red;
}
</style>
