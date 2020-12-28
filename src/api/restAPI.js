const when = require('when')
const axios = require('axios')
const { defer } = require('when')
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

}


