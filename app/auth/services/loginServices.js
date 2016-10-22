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

    var signIn = function(_obj){
        return $http({
            method: 'post',
            url: baseUrls.loginUrl + "login",
            data: _obj
        })
    }

    var getCookie = function(c_name) {
        var name = c_name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    return {
        SignUpMe: signUp,
        signInMe: signIn,
        getCookie : getCookie
    }
});
