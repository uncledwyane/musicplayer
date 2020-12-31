<template>
    <div id="login">
        <mu-form ref="form" v-if='loginType == 0' :model='validateForm.phone' class="mu-demo-form loginForm">
            <p class="title">手机登录</p>
            <mu-form-item  prop='phoneNumber' :rules="phoneNumberRules">
                <mu-text-field v-model="validateForm.phone.phoneNumber" prop='phoneNumber' placeholder='请输入手机号'><mu-icon value='local_phone'></mu-icon></mu-text-field>
            </mu-form-item>
            <mu-form-item prop='password' :rules="passwordRules">
                <mu-text-field type="password" v-model="validateForm.phone.password" prop='password' placeholder='请输入密码'><mu-icon value='lock'></mu-icon></mu-text-field>
                <span class="loginTypeChange loginWithEmail" @click="setLoginType(1)">邮箱登录?</span>
            </mu-form-item>
            <mu-form-item class="loginBtnBox">
                <mu-button @click="login" color='primary' class="loginBtn">登录</mu-button>
            </mu-form-item>
        </mu-form>
        <mu-form ref="form" v-else :model='validateForm.email' class="mu-demo-form loginForm">
            <p class="title">邮箱登录</p>
            <mu-form-item  prop='emailAddress' :rules="emailRules">
                <mu-text-field v-model="validateForm.email.emailAddress" prop='phoneNumber' placeholder='请输入邮箱'><mu-icon value='local_phone'></mu-icon></mu-text-field>
            </mu-form-item>
            <mu-form-item prop='password' :rules="passwordRules">
                <mu-text-field type="password" v-model="validateForm.email.password" prop='password' placeholder='请输入密码'><mu-icon value='lock'></mu-icon></mu-text-field>
                <span class="loginTypeChange loginWithPhone" @click="setLoginType(0)">返回手机登录</span>
            </mu-form-item>
            <mu-form-item class="loginBtnBox">
                <mu-button @click="login" color='primary' class="loginBtn">登录</mu-button>
            </mu-form-item>
        </mu-form>
    </div>
</template>

<script>
import RestAPI from '../../api/restAPI';
const restAPI = new RestAPI();
export default {
    data(){
        return {
            phoneNumberRules: [
                {validate: (val) => !!val, message: '必须填写手机号'},
                {validate: (val) => /^[1][3,4,5,7,8][0-9]{9}$/.test(val), message: '手机号不合法'}
            ],
            passwordRules: [
                {validate: (val) => !!val, message: '必须填写密码'}
            ],
            emailRules: [
                {validate: v => !!v,  message: '必须填写邮箱'},
                {validate: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v), message: '邮箱不合法'}
            ],
            validateForm: {
                phone: {
                    phoneNumber: '18282281521',
                    password: 'dwyanewade1998'
                },
                email: {
                    emailAddress: '',
                    password: ''
                }
            },
            userInfo: null,
            loginType: 0,
            loginTypeEnum: {
                0: 'phone',
                1: 'email'
            }
        }
    },
    mounted(){
        this.getCookieByName('NMTID')
        this.getCookieByName('__remember_me')
    },
    methods: {
        setLoginType(type){
            this.loginType = parseInt(type);
        },
        login(){
            var self = this;
            var validatePass = false;
            var formData = this.validateForm.phone;
            var phoneNumber = formData.phoneNumber;
            var password = formData.password;
            if(this.getCookieByName('NMTID') && this.getCookieByName(' __remember_me') || localStorage.getItem('token')){ // 登录过已经
                self.$router.push('/home');
            }else{
                self.$toast.error('还没登录')
                //TODO 说明没有登录，立即登录
                restAPI.login(phoneNumber, password).then(function (res){
                    var account = res.account;
                    var profile = res.profile;
                    console.log(res);
                    console.log(account);
                    console.log(profile);
                    // 存储token
                    localStorage.setItem('token', res.token);
                    self.formatAndSaveData(account);
                    self.formatAndSaveData(profile);
                    self.$router.push('/home');
                })
            }
            
        },
        loginWithEmail(){
            var self = this;
            self.setLoginType(1);
        },
        reset(){
            this.$refs.form.clear();
            this.validateForm = {
                phoneNumber: '',
                password: ''
            }
        },
        loginToServer(){
            console.log(this.validateForm);
        },

        formatAndSaveData(data){
            var keys = Object.keys(data);
            var values = Object.values(data);
            for(var i = 0; i < keys.length; i++){
                localStorage.setItem(keys[i], values[i])
            }
        },

        getCookieByName(name){
            console.log('+++getCookieByName, name:', name);
            var cookie = document.cookie;
            var cookieList = cookie.split(';');
            for(var i = 0; i < cookieList.length; i++){
                var tempCookieItem = cookieList[i].split('=');
                if(tempCookieItem[0] === name){
                    return tempCookieItem[1];
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    #login{
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        .mu-demo-form{
            width: 90%;
            background: rgba(255,255,255,.6);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 10px 15px;
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .loginBtnBox{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .title{
                color: rgb(83, 83, 83);
                font-size: 20px;
                margin-left: 50%;
                transform: translateX(-25%);
            }
            .loginTypeChange{
                position: absolute;
                top: 40px;
                right: 0;
                color: royalblue;
            }
        }
        
    }
</style>