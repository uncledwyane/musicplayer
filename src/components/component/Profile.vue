<template>
    <div id="profile_wrap">
        <div id="my_head_and_info">
            <!-- 头像、昵称、其他信息 -->
            <div class="header_img" v-show="isLogin">
                <img :src="profile.avatarUrl" alt="" class="header" />
            </div>
            <div class="other_info" v-show="isLogin">
                <p class="nickname"  :style="{color: customTheme.highlight.color}">{{ profile.nickname }}</p>
            </div>
            <div class="login_notice" v-show="!isLogin">
                <p :style="{color: customTheme.highlight.color}">{{ $t("login_notice") }}</p>
                <button class="show_login_btn" @click="showLogin"  :style="{backgroundColor: customTheme.highlight.color}">{{$t("login")}}</button>
            </div>
        </div>
        <div id="option_nav">
            <!-- 导航信息、路由 -->
            <div class="option" :style="{color: currentOption == option.optionName ? customTheme.highlight.color : ''}" v-for="(option, index) in options" :key="index" @click="goToOption(option.optionName)">
                <span class="option_icon">
                    <i :class="option.icon" class="navIcon"></i>
                </span>
                <span class="option_name">{{ $i18n.locale == 'zh' ? option.showName : option.optionName }}</span>
            </div>
        </div>
        <div id="version" :style="{color: customTheme.desc_color.color}">
            v{{version}}
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import bus from '@/components/bus'
export default {
    computed: mapState([
        'customTheme',
        'version'
    ]),
    data() {
        return {
            currentOption: "Home",
            options: [
                {
                    icon: "fa fa-home",
                    optionName: "Home",
                    showName: '首页'
                },
                {
                    icon: "fa fa-user-circle",
                    optionName: "MyInfo",
                    showName: '我的'
                },
            ],
            isLogin: '',
            account: null,
            profile: null
        };
    },
    created(){
        var self = this;
        self.isLogin = localStorage.getItem('isLogin');
        if(self.isLogin){
            self.account = JSON.parse(localStorage.getItem('account'))
            self.profile = JSON.parse(localStorage.getItem('profile'))
        }
    },
    mounted() {
        var self = this;
        self.currentOption = sessionStorage.getItem("optionName") || self.currentOption;
    },
    methods: {
        ...mapMutations([
            'setLoginComState'
        ]),
        showLogin(){
            var self = this;
            self.setLoginComState(true);
            bus.$emit('showOrHideLogin');
        },
        goToOption(optionName) {
            var self = this;
            sessionStorage.setItem("optionName", optionName);
            self.currentOption = optionName;
            self.$router.push('/' + optionName);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import '../scss/theme.scss';
#profile_wrap{
    position: relative;
}
p {
    margin: 0;
    padding: 0;
}
#my_head_and_info {
    height: 25%;
    margin-top: 30px;
}
#option_nav {
    margin-top: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.option {
    width: 60%;
    height: 30px;
    text-align: left;
    transition: all 0.3s ease;
    line-height: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: $font-color-dark;
}
.option:hover {
    cursor: pointer;
}
.option_active {
    color: $font-highlight-color-dark;
}
.option_icon {
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 14px;
    display: inline-block;
}
.navIcon{
    float: left;
}
.option_name {
    display: inline-block;
    margin-left: 10px;
    letter-spacing: 5px;
}
.header_img {
    @include display-center;
}
.header {
    width: 90px;
    border-radius: 50%;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}
.other_info {
    text-align: center;
}
.nickname {
    margin-top: 10px;
    color: $font-highlight-color-dark;
}
.otherinfo {
    color: rgb(144, 150, 169);
}
#platform_info{
    width: 80%;
    height: 90px;
    background: #e8ecf7;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.login_notice{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.login_notice p {
    margin-bottom: 10px;
    color: $font-highlight-color-dark;
    text-align: center;
}
.show_login_btn{
    width: 50%;
    height: 30px;
    border-radius: 16px;
    outline: none;
    box-shadow: none;
    border: none;
    background: #fd5833;
    color: #fff;
    transition: all ease .3s;
}
.show_login_btn:hover{
    cursor: pointer;
}
.show_login_btn:active{
    box-shadow: 0 0 10px #fd5833;
    border:none;
    outline: none;
    transform: scale(0.9);
}
#version{
    width: 100%;
    height: 20px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    bottom: 10px;
}
</style>
