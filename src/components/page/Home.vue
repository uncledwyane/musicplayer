<template>
    <div id="homeWrap">
        <mu-appbar style="width: 100%" color="red">
            <mu-button icon slot="left" @click="isShowTrackPlay = true">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            <span class="nickname">{{ nickname }}</span>
            <mu-button flat slot="right"></mu-button>
        </mu-appbar>
        <transition name="slide">
            <profile id="profile" v-show="isShowProfile"></profile>
        </transition>
        <transition name="content">
            <router-view></router-view>
        </transition>
        <div class="nav" id="bottom-navigation">
            <transition name="playpreview">
                <playpreview
                    class="playPreviewWrap"
                    v-show="isShowPlayPreview"
                    :isHideProgressBar="isShowPlayPreview"
                    :playingSong="songPlaying"
                ></playpreview>
            </transition>
            <mu-bottom-nav color="red" :value='navValue' @change="handleChange">
                <mu-bottom-nav-item value='homepage' title="首页" icon="home" to='/home/homepage' event='show'></mu-bottom-nav-item>
                <mu-bottom-nav-item value='favorite' title="最爱" icon="favorite" ></mu-bottom-nav-item>
                <mu-bottom-nav-item value='private' title="私人" icon="location_on"></mu-bottom-nav-item>
                <mu-bottom-nav-item value='myinfo' title="我的" icon="face" to='/home/myinfo'></mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>
        <transition name="trackplay">
            <track-play class="trackplay" v-show="isShowTrackPlay"></track-play>
        </transition>
        <audio id="songAudio" ref="songAudio"></audio>
    </div>
</template>

<script>
import Profile from "@/components/component/Profile";
import Playpreview from "@/components/component/Playpreview";
import trackPlay from "@/components/component/TrackPlay";
import bus from "@/components/bus";
import restAPI from "@/api/restAPI";
import TrackPlay from "../component/TrackPlay.vue";
const api = new restAPI();
export default {
    data() {
        return {
            isShowProfile: false,
            isShowPlayPreview: false,
            isShowTrackPlay: false,
            nickname: localStorage.getItem("nickname"),
            songPlaying: {
                songId: "",
                songName: "",
                isPlaying: false,
            },
            navValue: 'homepage'
        };
    },
    mounted() {
        var self = this;
        var audioCom = self.$refs.songAudio;
        var app = document.getElementById("app");
        self.navValue = sessionStorage.getItem('navValue');
        bus.$on("setProfileStatus", function (e) {
            self.isShowProfile = e;
        });
        bus.$on("setPlayPreviewStatus", function (e) {
            self.isShowPlayPreview = e;
        });
        bus.$on("setPlayingSong", function (songObj) {
            if (songObj.songId == self.songPlaying.songId) {
                console.log(
                    "+++warning: ",
                    self.songPlaying.songName,
                    "这首歌已经在播放了！"
                );
                return;
            }
            self.songPlaying.songId = songObj.songId;
            self.songPlaying.songName = songObj.songName;
            self.songPlaying.isPlaying = songObj.isPlaying;
            api.getSongUrl(songObj.songId).then(function (res) {
                audioCom.src = res.data[0].url;
                audioCom.play();
            });
        });
        bus.$on("pauseOrPlay", function (value) {
            if (audioCom && audioCom.src != "") {
                if (value == "pause") {
                    audioCom.pause();
                    self.songPlaying.isPlaying = false;
                } else if (value == "play") {
                    audioCom.play();
                    self.songPlaying.isPlaying = true;
                } else {
                }
            } else {
            }
        });

        bus.$on("setTrackPlayStatus", function (status) {
            self.isShowTrackPlay = status;
        });
        app.addEventListener("click", function (e) {
            if (e.target.id && e.target.id == "homeWrap" && self.isShowProfile) {
                self.isShowProfile = false;
            }
        });
    },
    components: {
        Profile,
        Playpreview,
        TrackPlay,
    },
    methods: {
        gotoPath(path) {
            var currentPath = this.$route.path;
            if (currentPath == path) {
                console.log("same");
            } else {
                this.$router.push(path);
            }
        },
        handleChange(val){
            var self = this;
            console.log('+++handleChange new Val: ', val);
            self.navValue = val;
            sessionStorage.setItem('navValue', val);
        }
    },
};
</script>

<style lang="scss" scoped>
#homeWrap {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    #bottom-navigation {
        position: absolute;
        width: 95%;
        height: 60px;
        margin-left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 10px 10px 0 0;
        background: #fff;
        // overflow: hidden;
    }
    #profile {
        position: absolute;
        width: 70%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 99;
        background: rgb(246, 246, 248);
        box-shadow: 0 40px 20px rgba(0, 0, 0, 0.3);
    }
    .playPreviewWrap {
        position: absolute;
        width: 100%;
        height: 80px;
        top: -70px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border-radius: 10px 10px 0 0;
        padding-bottom: 10px;
    }
}
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.content-enter-active,
.content-leave-active {
    transition: all ease 0.5s;
}
.slide-enter {
    transform: translateX(-100%);
}
.slide-leave-to {
    transform: translateX(-100%);
}
// .content-enter{
//     transform: translateX(0);
// }
.content-enter-to {
    transform: translateX(100%);
    opacity: 1;
}
.content-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
.nickname {
    position: relative;
    left: -13px;
}

.playpreview-enter-active,
.playpreview-leave-active {
    transition: all ease 0.3s;
}
.playpreview-enter {
    transform: translateY(70px);
    box-shadow: none;
}
.playpreview-leave-to {
    box-shadow: none;
    transform: translateY(70px);
}

.trackplay-enter-active,
.trackplay-leave-active {
    transition: all ease 0.3s;
}
.trackplay-enter {
    transform: translateY(100%) scale(1);
}
.trackplay-leave-to {
    transform: translateY(100%);
}

.mu-bottom-nav {
    border-radius: 10px 10px 0 0;
}
.trackplay {
    position: absolute;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
    background: rgba(255, 255, 255, 0.5);
}
</style>
