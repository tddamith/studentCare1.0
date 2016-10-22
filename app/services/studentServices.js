/**
 * Created by **** on 10/22/2016.
 */


stuCareApp.factory('studentServices', function ($http, baseUrls) {

    var getSubjectId = function (year) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "subject/all/" + year
        });
    };

    return {
        GetSubjectId: getSubjectId
    }
});
