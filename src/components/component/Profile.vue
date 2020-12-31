<template>
  <div id="profileWrap">
        <div class="content">
            <div class="avatarWrap">
                <img :src="avatarUrl" alt="Avatar" class="avatar">
                <span class="nickname">{{nickname}}</span>
            </div>
            <div class="routerGroup">
                <mu-button flat class="routerButton" @click="gotoPath('/home/homepage')"><mu-icon value='home'></mu-icon>  首页</mu-button>
                <mu-button flat class="routerButton" @click="gotoPath('/home/favorate')"><mu-icon value='favorite'></mu-icon>  最爱</mu-button>
                <mu-button flat class="routerButton" @click="gotoPath('/home/myinfo')"><mu-icon value='face'></mu-icon>  我的</mu-button>
            </div>
        </div>
        <mu-button class="logoutButton" color='red' @click="logout">退出登录</mu-button>
        <mu-dialog title="您确定要退出吗?" width="80%" max-width="80%"  :esc-press-close="false" :overlay-close="true" :open.sync="openAlert">
            <mu-button slot="actions" flat color="red" @click="confirmLogout">确定</mu-button>
            <mu-button slot="actions" flat color="primary" @click="cancelLogout">取消</mu-button>
        </mu-dialog>
        <mu-button fab small @click="hideProfile" class="closeProfileButton">X</mu-button>
  </div>
</template>

<script>
import bus from '@/components/bus'
export default {
    data(){
        return {
            nickname: localStorage.getItem('nickname'),
            avatarUrl: localStorage.getItem('avatarUrl'),
            backgroundUrl: localStorage.getItem('backgroundUrl'),
            city: localStorage.getItem('city'),
            signature: localStorage.getItem('signature'),
            openAlert: false
        }
    },
    methods: {
        hideProfile(){
            bus.$emit('setProfileStatus', false);
        },
        logout(){
            this.openAlert = true;
        },
        confirmLogout(){

        },
        cancelLogout(){
            this.openAlert = false;
        },
        gotoPath(path){
            var currentPath = this.$route.path;
            if(currentPath == path){
                console.log('same');
            }else{
                this.hideProfile();
                this.$router.push(path);
            }
        }
    }
}
</script>

<style lang='css' scoped>
    #profileWrap{
        width: 100%;
        height: 100vh;
    }
    .avatarWrap{
        width: 100%;
        height: 90px;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }
    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        align-self: center;
    }
    .closeProfileButton{
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .nickname{
        align-self: center;
    }
    .logoutButton{
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .routerGroup{
        width: 90%;
        border-radius: 15px;
        background: #fff;
        margin: 0 auto;
        overflow: hidden;
    }
    .routerButton{
        width: 100%;
        height: 40px;
        letter-spacing: 5px;
    }
</style>