<template>
    <div id="app">
        <profile id="profile" :style="{backgroundColor: customTheme.background.color}"></profile>
        <toptool id="toptool" :style="{backgroundColor: customTheme.background.color}"></toptool>
        <login id='login_wrap' ref="login" v-show="isShowLogin" :style="{backgroundColor: bgColor}"></login>
        <transition name="routerview" mode="in-out">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

        <audio ref="musicAudio" id="musicAudio" @ended='playEnd' ></audio>
    </div>
</template>

<script>
import Profile from "@/components/component/Profile";
import Toptool from "@/components/component/Toptool";
import Login from '@/components/component/Login';
import {mapState, mapMutations} from 'vuex';
import themeConfig from '@/components/theme'
import bus from '@/components/bus'
export default {
    data() {
        return {
            mytheme: null
        };
    },
    computed: {
        ...mapState([
            'isShowLogin',
            'customTheme',
            'trackList'
        ]),
        bgColor: function(){
            var self = this;
            var bgColor = self.customTheme.background.color.colorRgba(.3);
            return bgColor;
        }
    },
    created(){
        var self = this;
        self.mytheme = JSON.parse(localStorage.getItem('customTheme')) || themeConfig['CUSTOM'];
        console.log('themeConfig: ', themeConfig);
        self.setTheme(self.mytheme)
    },
    mounted() {
        var self = this;
        self.$refs.musicAudio.onended = function(e){
            self.stopPlay();
        }
        bus.$on('changeSong', function(songUrl){
            self.changeSong(songUrl);
        })

        bus.$on('showOrHideLogin', function(){
            self.showOrHideLogin();
        })
    },
    methods: {
        ...mapMutations(['setTheme', 'updatePlayingTrack']),
        showOrHideLogin(){
            var self = this;
            var loginCom = document.getElementById('login_wrap');
            if(self.isShowLogin){
                loginCom.style.transform = 'translateY(100%)';
            }else{
                loginCom.style.transform = 'translateY(0)';
            }
        },
        playEnd(){
            var self = this;
            self.updatePlayingTrack({
                state: 'pause',
                playState: false
            })
            // 播放结束，切到另一首歌
            // TODO 后续根据播放模式（随机/单曲循环/列表循环）控制下一曲
            bus.$emit('nextSong');
        },
        changeSong(url){
            var self = this;
            self.$refs.musicAudio.pause();
            self.$refs.musicAudio.src = url;
            self.$refs.musicAudio.play();
        },
        stopPlay(){
            var self = this;
            self.updatePlayingTrack({
                playState: false
            })
        }
    },
    components: {
        Profile,
        Toptool,
        Login
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import "../scss/theme.scss";
#app {
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    background: none !important;
    box-shadow: 20px 20px 30px rgb(0 0 0 / 56%);
    padding: 60px 0 0 12%;
    user-select: none;
    #profile {
        width: 12%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        overflow: hidden;
        user-select: none;
        // background: $front-color-dark;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    #toptool {
        position: absolute;
        top: 0;
        left: 12%;
        height: 60px;
        width: 88%;
        display: flex;
        align-items: center;
        background: $front-color-dark;
        z-index: 1;
    }
}

p {
    margin: 0;
    padding: 0;
}

.routerview-enter-active,
.routerview-leave-active {
    transition: all 0.5s ease;
}
.routerview-enter,
.routerview-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
.routerview-enter-to {
    opacity: 1;
}
#login_wrap{
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    backdrop-filter: blur(10px);
    transition: all linear .5s;
}

.login-enter-active,
.login-leave-active {
    transition: all 0.5s ease;
}
.login-enter{
    transform: translateY(-100%);
}
.login-enter-to {
    transform: translateY(0%);
}
</style>
