<template>
  <div class="followsAndFansWrap">
      <div id="followsAndFansWrap">
          <div class="typeChoose">
                <mu-button flat color='white' class="typeButton" @click="changeType('follow')">
                关注
                <span class="badge" v-show="type == 'follow'" ></span>
                </mu-button>
                <mu-button flat color='white' class="typeButton" @click="changeType('fans')">
                粉丝
                <span class="badge" v-show="type == 'fans'" ></span>
                </mu-button>
                <mu-button flat color='white' class="typeButton" @click="changeType('detail')">
                详情
                <span class="badge" v-show="type == 'detail'" ></span>
                </mu-button>
        </div>
        <div class="follows" v-if='this.type == "follow"'>
            <div class="follow" v-for="person in followsList" :key="person.userId">
                <img :src="person.avatarUrl" alt="" class="avatar">
                <div class="info">
                        <p class="nickname">{{ person.nickname }}</p>
                        <p class="signature">{{person.signature}}</p>
                </div>
            </div>
        </div>
        <div class="fans" v-else-if="this.type == 'fans'">
            <div class="follow" v-for="person in fansList" :key="person.userId">
                <img :src="person.avatarUrl" alt="" class="avatar">
                <div class="info">
                        <p class="nickname">{{ person.nickname }}</p>
                        <p class="signature">{{person.signature}}</p>
                </div>
            </div>
        </div>
        <div class="detail" v-else>
            <h3>基本信息:</h3>
            <p>昵称：{{ nickname }}</p>
            <p>性别：{{ gender | genderJudge(gender) }}</p>
        </div>
      </div>
  </div>
</template>

<script>
import bus from '../../components/bus'
export default {
    props: ['fansList','followsList'],
    filters: {
        genderJudge: function (gender){
            if(gender == 1){
                return '男';
            }else if(gender == 2){
                return '女';
            }
            else{
                return '保密'
            }
        }
    },
    data(){
        return {
            type: 'follow',
            nickname: localStorage.getItem('nickname'),
            gender: localStorage.getItem('gender')
        }
    },
    mounted(){
        var wrap = document.getElementsByClassName('followsAndFansWrap')[0];
        wrap.addEventListener('click', function (e){
            if(e.target.className == 'followsAndFansWrap'){
                console.log('+++clicked ele: ', e.target.className);
                bus.$emit('setFollowStatus', false);
            }
        })
    },
    methods: {
        changeType(type){
            var self = this;
            self.type = type;
        }
    }
}
</script>

<style lang='scss' scoped>
    .followsAndFansWrap{
        width: 100vw;
        height: 100vh;
    }
    #followsAndFansWrap{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 400px;
        overflow: hidden;
        transform: translate(-50%, -50%);
        box-shadow: 0 10px 20px rgba(0,0,0,.1);
        background: #fff;
        border-radius: 15px;
        padding: 15px;
    }
    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .typeChoose{
        width: 100%;
        height: 40px;
        background: rgb(244, 67, 54);
        z-index: 100;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 17px;
        .typeButton{
            width: 33.3%;
        }
        .badge{
            width: 40px;
            height: 4px;
            position: absolute;
            bottom: 3px;
            background: lightgreen;
            border-radius: 5px;
        }
    }
    .follows, .fans, .detail{
        width: 100%;
        height: 360px;
        overflow: scroll;
        padding-top: 40px;
    }
    .follow{
        width: 100%;
        height: 70px;
        display: flex;
        padding: 0 5px;
        align-items: center;  
    }
    .info{
        width: 350px;
        height: 50px;
        padding-left: 10px;
        .nickname, .signature{
            font-size: 12px;
            width: 100%;
        }
        .nickname{
            height: 18px;
        }
        .signature{
            height: 35px;
            overflow: hidden;
            color: grey;
            text-overflow: ellipsis;
        }
    }
    p{
        margin: 0;
        text-overflow: ellipsis;
    }
</style>