<template>
  <div>
      <div id="search_tool">
          <input type="text" name="search" id="search_com" placeholder="" v-model="keyword" :style="{color: theme.highlight.color, backgroundColor: theme.search_bar_bg.color}">
          <i class="fa fa-search searchicon" @click="searchSong" :style="{color: theme.highlight.color}"></i>
      </div>
      <div id="notice_and_setting">
          <span class="language" @click="changeLanguage"><i class="fa fa-language" style="color: #9ea8c4;"  :style="{color: theme.highlight.color}"></i></span>
          <span class="notice"><i class="fa fa-bell" style="color: #9ea8c4;"  :style="{color: theme.highlight.color}"></i></span>
          <span class="setting" @click="isShowTheme? isShowTheme = false : isShowTheme = true"><i class="fa fa-cog" style="color: #9ea8c4;" :style="{color: theme.highlight.color}"></i></span>
      </div>
      <div class="search_result" :style="{transform: songs? 'scaleY(1)' : 'scaleY(0)', backgroundColor: theme.background.color}" >
          <div class="song_item" v-for="song in songs" :key="song.id" @click="playIt(song)" :style="{backgroundColor: theme.list_bg.color, color: theme.text_color.color}">
              <div class="song_name">
                  <p class="name">{{song.name}}</p>
              </div>
              <div class="artist">
                  <p class="artist_name">{{ song.artists | artistFilter}}</p>
              </div>
          </div>
      </div>
      <div class="theme_switch" :style="{transform: isShowTheme? 'scale(1)' : 'scale(0)', backgroundColor: theme.background.color}">
          <div class="theme_change">
              <div class="default_theme theme_light" @click="changeThemeTo('LIGHT')" :style="{color: theme.text_color.color, backgroundColor: currTheme == 'LIGHT'? theme.highlight.color : ''}">Light <i class="fa fa-sun-o" style="position: absolute; right: 5px;font-size: 20px;top: 10px;"></i></div>
              <div class="default_theme theme_dark" @click="changeThemeTo('DARK')" :style="{color: theme.text_color.color, backgroundColor: currTheme == 'DARK'? theme.highlight.color : ''}">Dark <i class="fa fa-moon-o" style="position: absolute; right: 5px;font-size: 20px;top: 10px;"></i></div>
              <div class="default_theme theme_custom" @click="setThemeConfigState" :style="{color: theme.text_color.color, backgroundColor: currTheme == 'CUSTOM'? theme.highlight.color : ''}">Custom <i class="fa fa-gears" style="position: absolute; right: 5px;font-size: 20px;top: 10px;"></i></div>
          </div>
          <div class="custom_config" v-show="isShowThemeConfig">
              <div class="themes">
              <div class="color_item"  v-for="(color, index) in theme" :key="index"  :style="{backgroundColor: theme.list_bg.color}">
                  <div class="color_desc" :style="{color: theme.text_color.color}">{{ color.desc }}</div>
                  <div class="color_choose">
                    <input type="color" name="" id="chooseTheme" @change="colorChange" :data-name="color.key" v-model="color.color">
                  </div>
                    </div>
                </div>
                <div class="save_btn">
                    <span class="saveIt" @click="saveColorConfig" :style="{backgroundColor: theme.highlight.color, color: theme.text_color.color}">保存</span>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import bus from '@/components/bus'
import myAPI from '@/api/myAPI'
import theme from '@/components/theme'
import {mapState, mapMutations} from 'vuex'
export default {
    watch: {
        keyword: function(value){
            var self = this;
            if(!value){
                self.songs = null;
            }
        },
        theme: {
            handler(val, oldVal){
                var self = this;
                self.setTheme(val);
            },
            deep: true
        } 
    },
    data () {
        return {
            keyword: '',
            limit: 10,
            songs: null,
            theme: null,
            isShowTheme: false,
            isShowThemeConfig: false
        }
    },
    computed: {
        ...mapState(['currTheme'])
    },
    filters: {
        artistFilter(artists){
            var tempAr = [];
            artists.forEach(artist => {
                tempAr.push(artist.name);
            })
            return tempAr.toString();
        },
        shortTheme(theme){
            return theme.split('')[0]
        }  
    },
    created(){
        var self = this;
        self.theme = JSON.parse(localStorage.getItem('customTheme')) || theme['LIGHT']
    },
    methods: {
        ...mapMutations(['setCurrTheme', 'setTheme', 'updateLocalStorageTheme']),
        playIt(song){
            var self = this;
            myAPI.getSongDetail(song.id).then(function(res){
                console.log(':::获取歌曲详情成功：', res);
                self.keyword = '';
                bus.$emit('playSearchSong', res.songs[0]);
            })
        },
        searchSong(){
            var self = this;
            if(!self.keyword){
                return;
            }else{
                myAPI.searchSong(self.keyword, self.limit).then(function(res){
                    console.log(':::搜索关键词成功，结果：', res);
                    self.songs = res.result.songs;
                }).catch(function(err){
                    console.log(':::搜索关键词出错，错误：', err);
                })
            }
        },
        setThemeConfigState(){
            var self = this;
            var themeSwitchEle = document.getElementsByClassName('custom_config')[0];
            self.setTheme(theme['CUSTOM'])
            self.setCurrTheme('CUSTOM')
            if(self.isShowThemeConfig){
                self.isShowThemeConfig = false;
                themeSwitchEle.style.height = '0';
            }else{
                self.isShowThemeConfig = true;
                themeSwitchEle.style.height = '500px'
            }
        },
        colorChange(e){
            console.log(`:::颜色变了, 把${e.target.dataset.name}变为: ${e.target.value}`);
            // self.theme = themeConfig;
        },
        saveColorConfig(){
            var self = this;
            localStorage.setItem('customTheme', JSON.stringify(self.theme));
            self.setTheme(self.theme);
            self.isShowTheme = false;
        },
        changeLanguage(){
            var self = this;
            var currenLang = localStorage.getItem('lang');
            if(currenLang){
                if(currenLang == 'zh'){
                    self.$i18n.locale = 'en';
                }else{
                    self.$i18n.locale = 'zh';
                }
                localStorage.setItem('lang', self.$i18n.locale);
            }
            
        },
        changeThemeTo(themeName){
            var self = this;
            // 隐藏自定义颜色
            self.isShowThemeConfig = false;
            self.setCurrTheme(themeName)
            self.theme = theme[themeName]
            self.setTheme(theme[themeName]);
            self.updateLocalStorageTheme(theme[themeName])
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../scss/theme.scss';
    #notice_and_setting{
        position: absolute;
        right: 20px;
    }
    .fa{
        font-size: 17px;
        transition: all ease .3s;
    }
    .fa:hover{
        cursor: pointer;
    }
    #search_com{
        width: 400px;
        border: 2px solid rgba(117, 117, 117, 0.1);;
        border-radius: 20px;
        padding: 5px 10px;
        margin-left: 30px;
        height: 25px;
    }
    #search_com:focus{
        border-radius: 20px;
        color: $font-highlight-color-dark;
        outline-style: none;
        border: 2px solid rgba(117, 117, 117, 0.1);
    }
    .searchicon{
        position: relative;
        right: 30px;
        color: #656565;
    }
    .notice{
        margin:0 10px;
    }
    .search_result{
        width: 500px;
        background: rgba(0,0,0,.8);
        position: absolute;
        top: 60px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        transition: all ease .5s;
        transform-origin: top;
        box-shadow: 0 10px 20px rgba(0,0,0,.2);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .song_item{
        width: 100%;
        height: 40px;
        background: #282828;
        display: flex;
        color: #a7a7a7;
        margin-bottom: 10px;
        box-sizing: border-box;
        padding: 0 5px;
        border-radius: 5px;
    }
    .song_item:hover{
        background: $font-highlight-color-dark;
        color: #fff;
        cursor: pointer;
    }
    .song_item p{
        margin: 0;
    }
    .song_name{
        width: 60%;
    }
    .name{
        width: 100%;
        height: 40px;
        text-align: left;
        line-height: 40px;
    }
    .artist{
        width: 40%;
    }
    .artist_name{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
    .theme_switch{
        width: 250px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        align-items: center;
        position: absolute;
        top: 60px;
        right: 0;
        background: rgba(0,0,0,.6);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        transition: all ease .3s;
        transform-origin: right top;
        box-shadow: 0 20px 20px rgba(0,0,0,.2);
    }
    .custom_config{
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: all linear .5s;
    }
    #chooseTheme{
        width: 30px;
        height: 30px;
    }
    .themes{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .save_btn{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .saveIt{
        width: 70px;
        height: 30px;
        border-radius: 30px;
        text-align: center;
        line-height: 30px;
    }
    .saveIt:hover{
        cursor: pointer;
    }
    .color_item {
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background: #595959;
        color: #fff;
        border-radius: 5px;
        padding: 0 0 0 5px;
    }
    .color_desc {
        width: 70%;
    }
    .color_choose {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input[type="color"]{
        appearance: none;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 0;
    }
    input[type="color"]:focus{
        outline: none;
        border: none;
    }
    input[type="color"]:hover{
        cursor: pointer;
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        width: 30px;
        height: 30px;
    }
    input[type='color']::-webkit-color-swatch{
        width: 30px;
        height: 30px;
        border: 0;
        border-radius: 50%;
    }
    .default_theme{
        width: 100%;
        text-align: left;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0 5px;
        margin-bottom: 10px;
        position: relative;
    }
    .default_theme:hover{
        cursor: pointer;
    }
    .theme_change{
        width: 100%;
    }
</style>