<template>
    <div id="homepage" :style="{backgroundColor: customTheme.background.color}">
        <div class="hot_playlists">
            <div class="title">
                <h2 :style="{color: customTheme.highlight.color}">歌单推荐</h2>
                <div class="change_playlist">
                    <v-btn icon color="pink" :style="{color: theme.highlight.color}" @click="updatePlaylist('previous')">
                        <v-icon>mdi-chevron-double-left</v-icon>
                    </v-btn>
                    <v-btn icon color="pink" :style="{color: theme.highlight.color}" @click="updatePlaylist('next')">
                        <v-icon>mdi-chevron-double-right</v-icon>
                    </v-btn>
                    <v-btn icon color="green" :style="{color: theme.highlight.color}" @click="getNumByScreenWidth">
                        <v-icon>mdi-cached</v-icon>
                    </v-btn>
                </div>
            </div>
            <play-list :playlists="playlistShow"></play-list>

        </div>
        <div class="play_info">
            <div class="music_in_playlist">
                <h2 class="songsintro" :style="{color: customTheme.highlight.color}">{{ playingPlaylistName }}</h2>
                <div class="track_songs">
                    <track-list></track-list>
                </div>
            </div>
            <div class="track_play">
                <h2 class="songsintro" :style="{color: customTheme.highlight.color}">当前正在播放</h2>
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
import PlayList from '@/components/component/PlayList'
import bus from "../bus";
import theme from '@/components/theme'


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
        self.getNumByScreenWidth();

        bus.$on('getPlayListById', function(info){
            self.getTrackListById(info.id, info.name);
        })
    },
    created(){
        var self = this;
        self.theme = JSON.parse(localStorage.getItem('customTheme')) || theme['LIGHT']
    },
    components: {
        TrackList,
        Play,
        PlayList
    },
    methods: {
        ...mapMutations(["setHighQualityPlaylist", "setTrackList", "setTrackListIds"]),



        getNumByScreenWidth(){
            var self = this;
            var screenWidth = document.body.clientWidth;
            self.showNum = parseInt((screenWidth * 0.88) / 180);
            self.maxIndex = self.showNum - 1;
            self.playlistFilter(self.minIndex, self.maxIndex);
            console.log('根据屏幕获取歌单显示个数为： ', self.showNum);
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
            console.log('+++getTrackListById, id: ',id,  ' ,name: ', name );
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
.title {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0;
    color: #01103e;
}
.change_playlist {
    position: absolute;
    right: 10px;
    width: auto;
    display: flex;
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
