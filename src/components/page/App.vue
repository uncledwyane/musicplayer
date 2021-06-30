<template>
    <div id="app" :style="{ 'background-color': mainColor }">
        <profile id="profile"></profile>
        <toptool id="toptool"></toptool>
        <transition name="login" mode="in-out">
            <login id='login_wrap' v-show="isShowLogin"></login>
        </transition>
        <transition name="routerview" mode="in-out">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

        <audio ref="musicAudio" id="musicAudio"></audio>
    </div>
</template>

<script>
import theme from "@/components/scss/theme.scss";
import themeCSS from "@/components/theme";
import Profile from "@/components/component/Profile";
import Toptool from "@/components/component/Toptool";
import Login from '@/components/component/Login';
import {mapState} from 'vuex';
export default {
    data() {
        return {
            mainColor: themeCSS.light_theme,
            colors: {
                myRed: '#ffffff'
            }
        };
    },
    computed: {
        ...mapState([
            'isShowLogin'
        ])
    },
    mounted() {
        var self = this;
        var currLang = localStorage.getItem('lang');
        if(currLang){
            self.$i18n.locale = currLang;
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
    width: 1280px;
    height: 720px;
    z-index: 0;
    overflow: hidden;
    background: none !important;
    box-shadow: 20px 20px 30px rgb(0 0 0 / 56%);;
    @include position-center;
    border-radius: 20px;
    padding: 60px 0 0 12%;
    #profile {
        width: 12%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 20px 0 0 20px;
        overflow: hidden;
        user-select: none;
        background: $front-color-dark;
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
        border-radius: 0 20px 0 0;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.login-enter-active,
.login-leave-active {
    transition: all 0.5s ease;
}
.login-enter,
.login-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
.login-enter-to {
    opacity: 1;
}
</style>
