<template>
  <div id="homepageWrap">
      <div class="banner">
            <mu-carousel hide-indicators hide-controls>
                <mu-carousel-item v-for="banner in banners" :key="banner.imageUrl">
                    <img class="bannerImg" :src="banner.imageUrl">
                </mu-carousel-item>
            </mu-carousel>
      </div>
      <div class="recSongSheet">
          <h3>推荐歌单</h3>
          <div class="songSheets">
              <div class="songSheet" v-for="songsheet in recommentSongsSheet" :key="songsheet.id">
                  <img :src="songsheet.picUrl" class="songsheetPic" @click="getPlaylist(songsheet.id)">
                  <p class="songSheetName">{{ songsheet.name }}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import RestAPI from '../../api/restAPI';
import PlayList from '@/components/component/PlayList'
import bus from '../bus';
const restAPI = new RestAPI();
export default {
    data(){
        return {
            banners: null,
            recommentSongsSheet: null
        }
    },
    created(){
        var self = this;
        if(self.banners == null && sessionStorage.getItem('banners') == undefined){
            this.getBanner();
        }else{
            self.banners = JSON.parse(sessionStorage.getItem('banners'));
        }

        if(self.recommentSongsSheet == null && sessionStorage.getItem('recommentSongsSheet') == undefined){
            this.getRecommentSongsSheet();
        }else{
            self.recommentSongsSheet = JSON.parse(sessionStorage.getItem('recommentSongsSheet'));
        }
    },
    mounted(){
    },
    methods: {
        getBanner(){
            var self = this;
            restAPI.getRecommendBanner().then(function (res) {
                sessionStorage.setItem('banners', JSON.stringify(res.banners));
                if(!self.banners){
                    self.banners = res.banners;
                }
            })
        },
        getRecommentSongsSheet(){
            var self = this;
            restAPI.getRecommendSongs().then(function (res){
                sessionStorage.setItem('recommentSongsSheet', JSON.stringify(res.recommend));
                if(!self.recommentSongsSheet){
                    self.recommentSongsSheet = res.recommend;
                }
            })
        },
        getPlaylist(id){
            var self = this;
            self.$router.push(`/home/playdetail/${id}`)
        }
    }
}
</script>

<style lang='scss' scoped>
    .playlist-enter-active, .playlist-leave-active{
        transition: all ease .3s;
    }
    .playlist-enter{
        transform: scale(0);
    }
    .playlist-enter-to{
        transform: scale(1);
    }
    .playlist-leave-to{
        transform: scale(0);
    }
    #homepageWrap{
        width: 100%;
        height: 100vh;
        background: rgb(246, 246, 248);
        .banner{
            width: 100%;
            height: 170px;
            display: flex;
            align-items: center;
            justify-content: center;
            .mu-carousel{
                width: 95%;
                height: 80%;
                border-radius: 15px;
                overflow: hidden;
                .bannerImg{
                    max-width: 100%;
                    height: 100%;
                }
            }
        }
        .recSongSheet{
            width: 90%;
            padding: 10px;
            height: 170px;
            background: #fff;
            margin: 0 auto;
            border-radius: 15px;
            box-shadow: 0 0 10px rgba(0,0,0,.1);
            position: relative;
            overflow: hidden;
            h3{
                margin: 0 0 5px 0;
                height: 20px;
            }
            .songSheetDetail{
                position: absolute;
                right: 0;
                top: 0;
            }
            .songSheets{
                width: 100%;
                height: 125px;
                display: flex;
                overflow: scroll;
                border-radius: 10px;
                .songSheet{
                    width: 100px;
                    height: 120px;
                    margin-right: 15px;
                    .songsheetPic{
                        width: 80px;
                        height: 80px;
                        border-radius: 10px;
                    }
                    .songSheetName{
                        font-size: 12px;
                        height: 36px;
                        overflow: hidden;
                        margin: 0;
                        text-align: left;
                        transform: scale(0.9);
                    }
                }
            }
        }
        .playlist{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            z-index: 100;
        }
    }
    
</style>