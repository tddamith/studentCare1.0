/**
 * Created by **** on 10/22/2016.
 */


stuCareApp.factory('parentServices', function ($http, baseUrls) {

    //var getAttendanceByID = function (year) {
    //    return $http({
    //        method: 'get',
    //        url: baseUrls.mainUrl + "  /attendance/getByID/studentID/all/"
    //    });
    //};

    var getParentDetails = function (email) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "parent/student/info/" + email
        });
    };


    var getAllAdvertisement = function (lec) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "post/getAll"
        });
    };

    var getStudentHasAttend = function (studentId) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "attendance/getByID/" + studentId
        });
    }

    return {
        getAllAdvertisement: getAllAdvertisement,
        GetParentDetails: getParentDetails,
        GetStudentHasAttend: getStudentHasAttend

    }

});
