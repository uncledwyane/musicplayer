<template>
    <div id="homepage" :style="{backgroundColor: customTheme.background.color}">
        <div class="hot_playlists">
            <div class="title">
                <h2 :style="{color: customTheme.highlight.color}">{{ $t("playlist_intro") }}</h2>
                <div class="change_playlist">
                    <i class="fa fa-angle-left " @click="updatePlaylist('previous')" @mouseover="setColorToHighLight" @mouseout="recoveryColor"></i>
                    <i class="fa fa-angle-right " @click="updatePlaylist('next')" @mouseover="setColorToHighLight" @mouseout="recoveryColor"></i>
                </div>
            </div>
            <div class="playlist">
                <div
                    class="playlist_item"
                    v-for="playlist in playlistShow"
                    :key="playlist.id"
                >
                    <div class="playlist_cover">
                        <!-- <div class="playingLyer" v-show="playlist.id == playingPlaylistId"></div> -->
                        <img
                            :src="playlist.coverImgUrl"
                            :alt="playlist.id"
                            class="cover_img"
                            id="cover_img"
                            ref="coverImg"
                            @mouseover="showBoxShadow"
                            @click="getTrackListById(playlist.id, playlist.name)"
                            :style="{'box-shadow': playlist.id == playingPlaylistId ? `0 20px 20px ${customTheme.highlight.color}`: ''}"
                        />
                    </div>
                    <div class="playlist_info">
                        <p class="playlist_name" :style="{color: customTheme.text_color.color}">{{ playlist.name }}</p>
                        <p class="playlist_count" :style="{color: customTheme.desc_color.color}">{{ playlist.trackCount }}首</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="play_info">
            <div class="music_in_playlist">
                <h2 class="songsintro" :style="{color: customTheme.highlight.color}">{{ playingPlaylistName }}</h2>
                <div class="track_songs">
                    <track-list></track-list>
                </div>
            </div>
            <div class="track_play">
                <h2 class="songsintro" :style="{color: customTheme.highlight.color}">{{ $t("current_playing") }}</h2>
                <play></play>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import TrackList from "@/components/component/TrackList";
import Play from '@/components/component/Play'
import myAPI from '@/api/myAPI'
export default {
    computed: mapState(["highQualityPlaylist", "customTheme"]),
    data() {
        return {
            playlistShow: null, // 要显示在界面上的歌单，防止全部歌单显示浪费资源
            minIndex: 0,
            maxIndex: 6,
            showNum: 7, // 要显示在界面上的最多歌单数
            playingPlaylistName: "",
            playingPlaylistId: ''
        };
    },
    mounted() {
        var self = this;
        if (!self.highQualityPlaylist) {
            myAPI.getHighQualityPlaylist().then(function (res) {
                self.setHighQualityPlaylist(res.playlists);
                self.playlistFilter(self.minIndex, self.maxIndex);
                console.log(new Date(), " ::: 获取精品歌单成功： ", res);
                self.getTrackListById(res.playlists[0].id, res.playlists[0].name);
            });
        }
    },
    components: {
        TrackList,
        Play
    },
    methods: {
        ...mapMutations(["setHighQualityPlaylist", "setTrackList", "setTrackListIds"]),
        showBoxShadow(e){
            var self = this;
            var bgColor = self.customTheme.highlight.color.colorRgba(.5);
            e.target.style.boxShadow = `0 20px 20px ${bgColor}`

        },
        setColorToHighLight(e){
            var self = this;
            e.target.style.color = self.customTheme.highlight.color;
        },
        recoveryColor(e){
            var self = this;
            e.target.style.color = self.customTheme.desc_color.color;
        },
        playlistFilter(min, max) {
            var self = this;
            var tempArray = new Array();
            self.highQualityPlaylist.forEach(function (playlist, index) {
                if (index >= min && index <= max) {
                    tempArray.push(playlist);
                }
            });
            self.playlistShow = tempArray;
        },
        updatePlaylist(val) {
            var self = this;
            var playlistLength = self.highQualityPlaylist.length;
            if (val == "previous") {
                if (self.minIndex == 0 || self.minIndex - self.showNum < 0) {
                    self.minIndex = 0;
                    self.maxIndex = self.showNum - 1;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::不能往前翻页了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else if (self.minIndex - self.showNum == 0) {
                    self.minIndex -= self.showNum;
                    self.maxIndex -= self.showNum;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::往前翻到头了,再翻就不行了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else {
                    if (self.maxIndex == playlistLength) {
                        self.maxIndex = self.minIndex - 1;
                        self.minIndex -= self.showNum;
                    } else {
                        self.minIndex -= self.showNum;
                        self.maxIndex -= self.showNum;
                    }
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::往前翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                }
            } else {
                if (self.maxIndex > self.playlistLength) {
                    self.minIndex = self.minIndex;
                    self.maxIndex = self.maxIndex;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::不能往后翻页了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else {
                    if (
                        self.maxIndex + self.showNum > playlistLength &&
                        playlistLength - self.maxIndex <= self.showNum
                    ) {
                        self.maxIndex = playlistLength;
                        if (self.minIndex + self.showNum > playlistLength) {
                            self.minIndex = self.minIndex;
                        } else if (self.minIndex + self.showNum < playlistLength) {
                            self.minIndex += self.showNum;
                        } else {
                        }
                        self.playlistFilter(self.minIndex, self.maxIndex);
                        console.log(
                            new Date(),
                            `:::不够了往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                        );
                    } else {
                        self.maxIndex += self.showNum;
                        self.minIndex += self.showNum;
                        self.playlistFilter(self.minIndex, self.maxIndex);
                        console.log(
                            new Date(),
                            `:::往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                        );
                    }
                }
            }
        },
        getTrackListById(id, name) {
            var self = this;
            self.playingPlaylistName = name;
            self.playingPlaylistId = id;
            myAPI.getPlayListDetail(id).then(function (res) {
                self.setTrackList(res.playlist.tracks);
                var tempArray = [];
                res.playlist.tracks.forEach(function(track){
                    tempArray.push(track.id);
                })
                self.setTrackListIds(tempArray);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import '../scss/theme.scss';
h2,
p {
    margin: 0;
    padding: 0;
    font-weight: 200;
}

#homepage {
    display: flex;
    width: 88%;
    height: calc(100% - 60px);
    position: absolute;
    flex-direction: column;
    z-index: 0;
    left: 12%;
}
.hot_playlists {
    width: 100%;
    height: 30%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
}
.playlist {
    display: flex;
}
.playlist_item {
    width: 130px;
    height: 190px;
    margin-right: 50px;
}
.playlist_cover {
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    @include display-center;
}
.playlist_count {
    font-size: 12px;
}
.playlist_cover:hover {
    cursor: pointer;
}
.playingLyer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.5);
    backdrop-filter: blur(10px);
}
.playlist_info {
    position: relative;
    height: 60px;
    padding-top: 5px;
}
.playlist_name {
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    color: #fff;
}
.cover_img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    transition: all ease .3s;
}
.cover_img:hover {
    cursor: pointer;
}
.title {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    color: #01103e;
}
.change_playlist {
    position: absolute;
    right: 50px;
    width: auto;
    display: flex;
}
.fa {
    font-size: 25px;
    display: block;
    width: 25px;
    text-align: center;
    height: 25px;
    transition: all ease 0.3s;
}
.fa:hover {
    cursor: pointer;
}
.fa-angle-left {
    margin-right: 20px;
}
.play_info {
    width: 100%;
    height: 70%;
    box-sizing: border-box;
    padding: 10px 0 0 20px;
    display: flex;
}
.music_in_playlist {
    width: 60%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.songsintro {
    height: 5%;
    margin: 10px 0px;
}
.track_songs {
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    padding-bottom: 15px;
    height: 90%;
    overflow: hidden;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    width: 10px;
    background: none;
    display: none;
}
::-webkit-scrollbar-thumb {
    background: $front-color-dark;
    border-radius: 5px;
}
::-webkit-scrollbar-button {
    display: none;
}
.track_play{
    width: 40%;
    /* background: lightblue; */
    padding: 0 20px 10px 20px;
}
</style>
