<template>
  <div id="myInfoWrap">
      <div class="avatarAndInfo">
          <div class="bgBanner" :style='"background: url(" + this.backgroundUrl + ") center center no-repeat; background-size: cover;"'></div>
          <div class="avatarBanner">
              <img :src="avatarUrl" alt="avatar" class="avatar"><span class="nickname">{{ nickname }}</span>
              <p class="signature">{{ signature }}</p>
              <div class="other" >
                  <mu-button flat color='primary' class="otherInfo" @click="showFollow('follow')">{{ followCount }}关注</mu-button>
                  <mu-button flat color='secondary' class="otherInfo" @click="showFollow('fans')"> {{ fansCount }}粉丝</mu-button>
                  <mu-button flat color='success' class="otherInfo" @click="showFollow('detail')"> Lv.{{ currlevel }}</mu-button>
              </div>
          </div>
      </div>
      <div class="myPlayList">
          <span class="playListTitle">收藏的歌单</span>
          <ul class="playListCollection">
              <li v-for="collect in playList" :key="collect.id" class="playListCollectionItem">
                  <div class="collectionCover">
                      <img :src="collect.coverImgUrl" class="coverImg">
                  </div>
                  <div class="collecttionInfo">
                      <p class="collecttionName">{{collect.name}}</p>
                      <div class="playInfo">
                            <span class="collecttionCount">{{collect.trackCount}} 首，</span>
                            <span class="createBy">by {{collect.creator.nickname}}，</span>
                            <span class="playCount">播放{{collect.playCount}}次</span>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
      <transition name="follow">
          <followAndFans id="followAndFans" ref="follow" :followsList="followsList" :fansList='fansList' v-show='isShowFollow'></followAndFans>
      </transition>
  </div>
</template>

<script>
import RestAPI from '@/api/restAPI'
import FollowAndFans from '@/components/component/FollowAndFans'
import bus from '../bus'
const restApi = new RestAPI()
export default {
    data(){
        return{
            nickname: localStorage.getItem('nickname'),
            avatarUrl: localStorage.getItem('avatarUrl'),
            backgroundUrl: localStorage.getItem('backgroundUrl'),
            signature: localStorage.getItem('signature'),
            createTime: localStorage.getItem('createTime'),
            uid: localStorage.getItem('userId'),
            followCount: sessionStorage.getItem('followCount'),
            fansCount: sessionStorage.getItem('fansCount'),
            currlevel:  sessionStorage.getItem('currlevel'),
            listenSongs:  sessionStorage.getItem('listenSongs'),
            createDays: sessionStorage.getItem('createDays'),
            playList: null,
            fansList: null,
            followsList: null,
            isShowFollow: false
        }
    },
    components: {
        FollowAndFans
    },
    mounted(){
        var self = this;
        if(self.playList == null && sessionStorage.getItem('playList') == undefined){
            self.getUserPlayList();
        }else{
            self.playList = JSON.parse(sessionStorage.getItem('playList'));
        }

        if(self.currlevel == null && sessionStorage.getItem('currlevel') == undefined){
            self.getUserDetail();
        }

        if(self.fansList == null && sessionStorage.getItem('fansList') == undefined){
            self.getUserFans();
        }else{
            self.fansList = JSON.parse(sessionStorage.getItem('fansList'));
        }

        if(self.followsList == null && sessionStorage.getItem('followsList') == undefined){
            self.getUserFollows();
        }else{
            self.followsList = JSON.parse(sessionStorage.getItem('followsList'));
        }

        bus.$on('setFollowStatus', function (status){
            console.log('+++setFollowStatus: ',status);
            self.isShowFollow = status;
        })
    },
    methods: {
        getUserDetail(){
            console.log('+++getUserDetail');
            var self = this;
            restApi.getUserDetail(self.uid).then(function (res){
                console.log('+++getUserDetail Success');
                sessionStorage.setItem('currlevel', res.level);
                sessionStorage.setItem('listenSongs', res.listenSongs);
                sessionStorage.setItem('createDays', res.createDays);
                if(!self.currlevel){
                    self.currlevel = res.level;
                    self.listenSongs = res.listenSongs;
                    self.createDays = res.createDays;
                }
            })
        },
        getUserPlayList(){
            console.log('+++getUserPlayList');
            var self = this;
            restApi.getUserPlayList(self.uid).then(function (res){
                console.log('+++getUserPlayList Success!');
                sessionStorage.setItem('playList', JSON.stringify(res.playlist))
                if(!self.playList){
                    self.playList = res.playlist;
                }
            })
        },
        getUserFollows(){
            console.log('+++getUserFollows');
            var self = this;
            restApi.getUserFollows(self.uid).then(function (res){
                console.log('+++getUserFollows Success!');
                sessionStorage.setItem('followsList', JSON.stringify(res.follow));
                sessionStorage.setItem('followCount', res.follow.length);
                if(!self.followsList){
                    self.followsList = res.follow;
                    self.followCount = res.follow.length;
                }
            })
        },
        getUserFans(){
            console.log('+++getUserFans');
            var self = this;
            restApi.getUserFans(self.uid).then(function (res){
                console.log('+++getUserFans Success!');
                sessionStorage.setItem('fansList', JSON.stringify(res.followeds));
                sessionStorage.setItem('fansCount', res.followeds.length);
                // session没有值的时候使用
                if(!self.fansList){
                    self.fansList = res.followeds;
                    self.fansCount = res.followeds.length;
                }
            })
        },
        showFollow(type){
            var self = this;
            if(type){
                self.$refs.follow.changeType(type);
                self.isShowFollow = true;
            }else{
                self.isShowFollow = true;
            }
            
        }
    }
}
</script>

<style lang='scss' scoped>
    .follow-enter-active, .follow-leave-active{
        transition: all ease .3s;
    }
    .follow-enter{
        transform: scale(0);
    }
    .follow-enter-to{
        transform: scale(1);
    }
    .follow-leave-to{
        transform: scale(0);
    }
    #myInfoWrap{
        width: 100%;
        height: 100vh;
        padding-bottom: 120px;
        overflow: scroll;
        .bgBanner{
            width: 100%;
            height: 250px;
        }
        .avatarBanner{
            width: 85%;
            // height: 130px;
            position: relative;
            background: #fff;
            margin: 0 auto;
            top: -50px;
            border-radius: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,.1);
            padding: 50px 10px 10px 10px;
        }
        #followAndFans{
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 100;
        }
    }
    .avatar{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #fff;
        position: absolute;
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
    }
    .nickname{
        display: block;
        width: 100%;
        text-align: center;
        color: rgba(0,0,0,.8);
        font-size: 17px;
    }
    .other{
        width: 100%;
        height: 30px;
        text-align: center;
        margin-top: 5px;
    }
    .signature{
        width: 100%;
        display: flex;
        justify-content: center;
        margin:0;
    }
    .myPlayList{
        width: 85%;
        margin: 0 auto;
        border-radius: 15px;
        padding: 10px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        .playListTitle{
            font-size: 18px;
        }
        .playListCollection{
            width: 100%;
            margin-left: 0;
            margin-block-start: 0;
            margin-block-end: 0;
            padding-left: 0;
            .playListCollectionItem{
                list-style: none;
                display: flex;
                width: 100%;
                align-items: center;
                height: 80px;
                .collectionCover{
                    width: 20%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .coverImg{
                        width: 50px;
                        height: 50px;
                        border-radius: 10px;
                    }
                }
                .collecttionInfo{
                    width: 80%;
                    .playInfo{
                        width: 100%;
                        .collecttionCount, .createBy,.playCount{
                            font-size: 10px;
                            color: grey;
                            transform: scale(0.9);
                        }
                    }
                    .collecttionName{
                        font-size: 12px;
                        margin: 5px 0 5px 5px;
                    }
                }
            }
        }
    }
</style>