<template>
  <div>
      <div class="login_box">
          <div class="login_category">
              <div class="login_with_phone category_name" :class="{category_active: category == 'phone'}" @click="changeCategory('phone')">{{ $t( "login_phone" ) }}</div>
              <div class="login_with_email category_name" :class="{category_active: category == 'email'}" @click="changeCategory('email')">{{ $t("login_email") }}</div>
          </div>
          <div class="login_phone" v-show="category == 'phone'">
              <div class="phonenumber">
                    <i class="fa phone_icon"></i>
                    <input type="number" name="phonenumber" id="phone_input" class="form_data_input" :placeholder="placeholderPhoneNum">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" id="phone_password_input" class="form_data_input" :placeholder="placeholderPass">
              </div>
          </div>
          <div class="login_email" v-show="category == 'email'">
              <div class="email">
                    <i class="fa email_icon"></i>
                    <input type="email" name="email" id="email_input" class="form_data_input" :placeholder="placeholderEmail">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" id="email_password_input" class="form_data_input" :placeholder="placeholderPass">
              </div>
          </div>
          <div class="excute_login">
              <button class="excute_login_btn">{{ $t("login") }}</button>
          </div>
          <div class="close_btn" @click="setLoginComState(false)">
          </div>
      </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    data () {
        return {
            category: 'phone',
            placeholderPhoneNum: "请输入手机号码",
            placeholderPass: "请输入密码",
            placeholderEmail: "请输入邮箱"
        }
    },
    methods:{
        ...mapMutations([
            'setLoginComState'
        ]),
        changeCategory(category){
            var self = this;
            self.category = category;
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
    font-size: 20px;
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
    background: $font-highlight-color-dark;
    transition: all ease .3s;
}
.close_btn:hover{
    cursor: pointer;
    background: url('../../../assets/close.png') center center no-repeat;
    background-size: 20px 20px;
}
</style>