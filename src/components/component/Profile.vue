<template>
    <div id="profile_wrap">
        <div id="my_head_and_info">
            <!-- 头像、昵称、其他信息 -->
            <div class="header_img">
                <img src="../../../assets/img/header.png" alt="" class="header" />
            </div>
            <div class="other_info">
                <p class="nickname">Dwyane Wade</p>
                <p class="otherinfo">sweetywangbo@gmail.com</p>
            </div>
        </div>
        <div id="option_nav">
            <!-- 导航信息、路由 -->
            <div class="option" :class="{ option_active: currentOption == option.optionName }" v-for="(option, index) in options" :key="index" @click="goToOption(option.optionName)">
                <span class="option_icon">
                    <i :class="option.icon"></i>
                </span>
                <span class="option_name">{{ option.optionName }}</span>
            </div>
        </div>
        <div id="my_music">
            <!-- 关于我、路由 -->
        </div>
        <div id="platform_info">
            <!-- 系统信息、浏览器信息 -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentOption: "",
            options: [
                {
                    icon: "fa fa-home",
                    optionName: "Home",
                },
                {
                    icon: "fa fa-folder",
                    optionName: "Album",
                },
                {
                    icon: "fa fa-compass",
                    optionName: "Browse",
                },
                {
                    icon: "fa fa-user",
                    optionName: "Artists",
                },
                {
                    icon: "fa fa-video-camera",
                    optionName: "Videos",
                },
                {
                    icon: "fa fa-user-circle",
                    optionName: "MyInfo",
                },
            ],
        };
    },
    mounted() {
        var self = this;
        self.currentOption = sessionStorage.getItem("optionName");
    },
    methods: {
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
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    align-items: left;
}
.option {
    height: 30px;
    text-align: left;
    transition: all 0.3s ease;
    line-height: 30px;
    margin-bottom: 10px;
}
.option:hover {
    cursor: pointer;
    color: $default-color;
}
.option_active {
    color: $default-color;
}
.option_icon {
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 14px;
    display: inline-block;
}
.option_name {
    display: inline-block;
    margin-left: 10px;
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
}
.otherinfo {
    color: rgb(144, 150, 169);
}
#platform_info{
    width: 170px;
    height: 90px;
    background: #e8ecf7;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
