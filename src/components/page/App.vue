<template>
    <div id="app" :style="{ 'background-color': mainColor }">
        <profile id="profile"></profile>
        <toptool id="toptool"></toptool>
        <transition name="routerview">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import theme from "@/components/scss/theme.scss"
import themeCSS from "@/components/theme"
import Profile from "@/components/component/Profile"
import Toptool from '@/components/component/Toptool'
export default {
    data() {
        return {
            mainColor: themeCSS.light_theme,
        };
    },
    mounted() {},
    components: {
        Profile,
        Toptool
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import "../scss/theme.scss";
#app {
    width: 100vw * (16 / 25) + 5vw;
    height: 100vw * (9 / 25) + 5vw;
    background-size: cover;
    z-index: 0;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    @include position-center;
    border-radius: 20px;
    position: relative;
    padding: 60px 0 0 12%;
    #profile {
        width: 17%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 20px 0 0 20px;
        overflow: hidden;
        user-select: none;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
    }
    #toptool{
      position: absolute;
      top: 0;
      left: 17%;
      height: 60px;
      width: 83%;
      border-radius: 0 20px 0 0;
      border-bottom: 1px solid rgb(233, 233, 233);
      display: flex;
      align-items: center;
    }
} 

  p {
      margin: 0;
      padding: 0;
  }

  .routerview-enter-active, .routerview-leave-active{
    transition: all .5s ease;
  }
  .routerview-enter{
    transform: translateY(-100%);
    opacity: 0;
  }
  .routerview-leave-to{
    transform: translateY(100%);
    opacity: 0;
  }
</style>
