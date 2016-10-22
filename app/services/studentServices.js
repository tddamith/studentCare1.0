/**
 * Created by **** on 10/22/2016.
 */


stuCareApp.factory('studentServices', function ($http, baseUrls) {
    var createNew = function (param) {
        return $http({
            method: 'post',
            url: baseUrls.loginUrl + "register/parent",
            data: param
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    return {
        CrateNew: createNew
    }
});
