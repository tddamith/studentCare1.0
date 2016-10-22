/**
 * Created by *** on 10/21/2016.
 */

stuCareApp.factory('loginService', function ($http, baseUrls) {
    var signUp = function (param) {
        console.log(param);
        return $http({
            method: 'post',
            url: baseUrls.loginUrl + "register/parent",
            data: param
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    return {
        SignUpMe: signUp
    }
});
