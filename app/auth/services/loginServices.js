/**
 * Created by *** on 10/21/2016.
 */

stuCareApp.factory('loginService', function ($http, baseUrls) {
    var signUp = function (param) {
        return $http({
            method: 'post',
            url: baseUrls.loginUrl + "register/parent",
            data: param
        })
    };

    var signIn = function (_obj) {
        return $http({
            method: 'post',
            url: baseUrls.loginUrl + "login",
            data: _obj
        })
    }

    var getCookie = function (c_name) {
        var name = c_name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    var getCookieState = function (c_name) {
        var name = c_name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                return true;
            }
            if (c.indexOf(name) == 0) {
                return true;
            }
        }
        return false;
    };

    var getUserName = function () {
        var cookieObj = getCookie('authData');
        if (cookieObj) {            
            cookieObj = JSON.parse(cookieObj);
            return cookieObj.userName
        }
        return false;
    };
    var getType = function(){
        var cookieObj = getCookie('authData');
        if (cookieObj) {            
            cookieObj = JSON.parse(cookieObj);
            return cookieObj.type.toUpperCase()
        }
        return false;
    }
    var cookieStatus = function(){
        (getCookie('authData')) ? return true : return false;
    }


    return {
        SignUpMe: signUp,
        signInMe: signIn,
        getUserName : getUserName,
        getType : getType,
        cookieStatus : cookieStatus
    }
});
