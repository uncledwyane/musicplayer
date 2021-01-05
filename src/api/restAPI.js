const when = require('when')
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

module.exports = function RestAPI(){
    function fetchGet(api, params){
        var deferred = when.defer();
        axios.get(api, params).then(function (res){
            if(res.status === 200){
                deferred.resolve(res.data);
            }else{
                deferred.reject(res.data);
            }
        }).catch(function (err){
            deferred.reject(err)
        })
        return deferred.promise;
    }

    function fetchPost(api, params){
        var deferred = when.defer();
        axios.get(api, params,{headers: {'Content-Type': 'multipart/form-data'}}).then(function (res){
            if(res.status === 200){
                deferred.resolve(res.data);
            }else{
                deferred.reject(res.data);
            }
        }).catch(function (err){
            deferred.reject(err)
        })
        return deferred.promise;
    }

    /**
     * 通过手机号登录
     * @param {String} phoneNumber
     * @param {String} password
     */
    this.login = function (phoneNumber, password){
        console.log('+++restAPI, login, phoneNumber: ', phoneNumber, ' password: ', password);
        var formatPassword = encodeURIComponent(password);
        return fetchGet('/login/cellphone', {params: {phone: phoneNumber, password: formatPassword}});
    }

    /**
     * 通过uid获取用户详细信息
     * @param {String} userId 用户Id
     */
    this.getUserDetail = function (userId){
        return fetchGet('/user/detail', {params: {uid: userId}})
    }

    /**
     * 获取用户歌单
     * @param {String} uid
     */
    this.getUserPlayList = function (userId){
        return fetchGet('/user/playlist', {params: {uid: userId}})
    }

    /**
     * 获取用户关注列表
     * @param {String} userId
     */
    this.getUserFollows = function (userId){
        return fetchGet('/user/follows', {params: {uid: userId}})
    }

    /**
     * 获取用户粉丝列表
     * @param {String} userId
     */
    this.getUserFans = function (userId){
        return fetchGet('/user/followeds', {params: {uid: userId}})
    }

    /**
     * 获取推荐banner
     * @param { Number } type [0: PC, 1: Android, 2: iPhone, 3: iPad]
     */
    this.getRecommendBanner = function (sysType){
        if(sysType){
            return fetchGet('/banner', {params: {type: sysType}})
        }else{
            return fetchGet('/banner')
        }
    }

    /**
     * 获取每日推荐歌单
     */
    this.getRecommendSongs = function (){
        return fetchGet('/recommend/resource')
    }

    /**
     * 获取歌单详情
     * @param {String} id 歌单id
     */
    this.getPlayListDetail = function (id){
        return fetchGet('/playlist/detail', {params: {id: id}})
    }

    /**
     * 获取音乐的播放url
     * @param { String } id 音乐id
     */
    this.getSongUrl = function (id){
        return fetchGet('/song/url', {params: {id: id}})
    }

    /**
     * 检测音乐是否可用
     * @param {String } id
     */
    this.checkMusic = function (id){
        return fetchGet('/check/music', {params: {id: id}})        
    }
}


