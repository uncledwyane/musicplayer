<template>
  <div>
      <div class="login_box"  :style="{backgroundColor: customTheme.background.color}">
          <div class="login_category">
              <div class="login_with_phone category_name" :style="{color: customTheme.highlight.color}" :class="{category_active: category == 'phone'}" @click="changeCategory('phone')">{{ $t( "login_phone" ) }}</div>
              <div class="login_with_email category_name" :style="{color: customTheme.highlight.color}" :class="{category_active: category == 'email'}" @click="changeCategory('email')">{{ $t("login_email") }}</div>
          </div>
          <div class="login_phone" v-show="category == 'phone'">
              <div class="phonenumber">
                    <i class="fa phone_icon"></i>
                    <input type="number" v-model="cellphone" :style="{color: customTheme.highlight.color, backgroundColor: customTheme.background.color}" name="phonenumber" id="phone_input" class="form_data_input" :placeholder="placeholderPhoneNum">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" v-model="password" :style="{color: customTheme.highlight.color, backgroundColor: customTheme.background.color}" id="phone_password_input" class="form_data_input" :placeholder="placeholderPass">
              </div>
          </div>
          <div class="login_email" v-show="category == 'email'">
              <div class="email">
                    <i class="fa email_icon"></i>
                    <input type="email" :style="{color: customTheme.highlight.color, backgroundColor: customTheme.background.color}" name="email" id="email_input" class="form_data_input" :placeholder="placeholderEmail">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" :style="{color: customTheme.highlight.color, backgroundColor: customTheme.background.color}" id="email_password_input" class="form_data_input" :placeholder="placeholderPass">
              </div>
          </div>
          <div class="excute_login">
              <button class="excute_login_btn" @click="excuteLogin" :style="{backgroundColor: customTheme.highlight.color, color: customTheme.text_color.color}">{{ $t("login") }}</button>
          </div>
          <div class="close_btn" @click="hideLogin" :style="{backgroundColor: customTheme.highlight.color}">
          </div>
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import bus from '@/components/bus'
import myAPI from '@/api/myAPI'
export default {
    data () {
        return {
            category: 'phone',
            placeholderPhoneNum: "请输入手机号码",
            placeholderPass: "请输入密码",
            placeholderEmail: "请输入邮箱",
            cellphone: '',
            password: ''
        }
    },
    computed: {
        ...mapState(["customTheme"])  
    },
    methods:{
        ...mapMutations([
            'setLoginComState',
            'setLoginState'
        ]),
        changeCategory(category){
            var self = this;
            self.category = category;
        },
        hideLogin(){
            var self = this;
            self.setLoginComState(false);
            bus.$emit('showOrHideLogin');
        },
        excuteLogin(){
            var self = this;
            if(!self.cellphone || !self.password){
                return;
            }else{
                var phoneReg = new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/);
                var passReg = new RegExp(/^[a-z0-9_-]{8,30}$/);
                var phoneResult = phoneReg.exec(self.cellphone);
                var passResult = passReg.exec(self.password);
                if(phoneResult && passResult){
                    console.log(':::登录，手机号为：', self.cellphone);
                    myAPI.login(self.cellphone, self.password).then(function(res){
                        console.log(':::登录成功, res: ', res);
                        self.setLoginState(true)
                        self.setLoginComState(false)
                        localStorage.setItem('isLogin', true)
                        localStorage.setItem('account', JSON.stringify(res.account))
                        localStorage.setItem('profile', JSON.stringify(res.profile))
                    })
                }else{
                    console.log(':::账号输入有误（只能11位有效电话号码）：', self.password);
                    console.log(':::或者密码输入有误（只能8到30位包含下划线和连字符等，不能含有空格）：', self.password);
                }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../scss/theme.scss';
@import '../scss/mixins.scss';
/*添加css样式*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
.login_box{
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $background-color-dark;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,.3);
}
.login_category {
    display: flex;
    width: 40%;
    height: 20%;
}
.login_with_phone {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
    height: 60%;
}
.login_with_email {
    display: flex;
    width: 50%;
    height: 60%;
    align-items: center;
    justify-content: center;
}
.login_phone , .login_email{
    display: flex;
    flex-direction: column;
    width: 85%;
}
.form_data_input{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 0 20px;
    background: $front-color-dark;
    color: $font-highlight-color-dark;
    font-size: 15px;
}
.excute_login{
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
}
button.excute_login_btn {
    width: 40%;
    height: 40px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 18px;
    color: #fff;
    background: $font-highlight-color-dark;
    transition: all ease .2s;
}
button.excute_login_btn:hover{
    cursor: pointer;
}
button.excute_login_btn:active{
    border: none;
    outline: none;
    box-shadow: 0 0 15px $font-highlight-color-dark;
}
.category_name{
    color: $font-highlight-color-dark;
    height: 30px;
    box-sizing: border-box;
}
.category_name:hover{
    cursor: pointer;
}
.category_active{
    color: $font-highlight-color-dark;
    // background:  $font-highlight-color-dark;
    border-bottom: 2px dotted $font-highlight-color-dark;
}
.close_btn{
    width: 20px;
    border-radius: 50%;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    transition: all ease .3s;
}
.close_btn:hover{
    cursor: pointer;
    background: url('../../../assets/close.png') center center no-repeat;
    background-size: 20px 20px;
}
</style>