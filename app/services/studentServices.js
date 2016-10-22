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

    var getStudentRecord = function (studentId) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "student/availability/" + studentId
        });
    };

    return {
        GetSubjectId: getSubjectId,
        GetStudentRecord: getStudentRecord
    }
});
