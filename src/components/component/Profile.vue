<template>
    <div id="profile_wrap">
        <div id="my_head_and_info">
            <!-- 头像、昵称、其他信息 -->
            <div class="header_img" v-if="isLogin">
                <img :src="profile.avatarUrl" alt="" class="header" />
            </div>
            <div class="other_info" v-if="isLogin">
                <p class="nickname"  :style="{color: customTheme.highlight.color}">{{ profile.nickname }}</p>
            </div>
            <div class="login_notice" v-show="!isLogin">
                <p :style="{color: customTheme.highlight.color}">提示</p>
                <button class="show_login_btn" @click="showLogin"  :style="{backgroundColor: customTheme.highlight.color}">登录</button>
            </div>
        </div>
        <div id="option_nav">
            <!-- 导航信息、路由 -->
            <v-list dense nav class="route-list" :style="{background: customTheme.background.color}">
                <v-list-item v-for="item in options" :key="item.showName" @click="goToOption(item.optionName)">
                    <v-list-item-icon style="margin-right: 10px; font-size: 18px;" >
                        <v-icon :style="{color: currentOption == item.optionName ? customTheme.highlight.color : customTheme.text_color.color}">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title  :style="{color: currentOption == item.optionName ? customTheme.highlight.color : customTheme.text_color.color}">{{ item.optionName }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
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
                    icon: "mdi-home-variant-outline",
                    optionName: "Home",
                    showName: '首页'
                },
                {
                    icon: "mdi-account-outline",
                    optionName: "MyInfo",
                    showName: '我的'
                },
            ],
            isLogin: false,
            account: null,
            profile: {
                avatarUrl: '',
                nickname: ''
            }
        };
    },
    created(){
        var self = this;
        self.isLogin = localStorage.getItem('isLogin');
        if(self.isLogin){
            self.account = JSON.parse(localStorage.getItem('account'))
            self.profile = JSON.parse(localStorage.getItem('profile'))
        }else{
            self.setLoginComState(true);
        }
    },
    mounted() {
        var self = this;
        self.currentOption = sessionStorage.getItem("optionName");
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
    height: 50%;
    flex-direction: column;
    align-items: center;
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
    left: -5px;
    bottom: 10px;
}

.route-list{
    width: 100%;
}
</style>
