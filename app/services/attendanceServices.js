/**
 * Created by **** on 10/22/2016.
 */


stuCareApp.factory('attendanceServices', function ($http, baseUrls) {

    var getAllLecture = function (year) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "lecturer/all/"
        });
    };

    var getLectureHasSubject = function (lec) {
        return $http({
            method: 'get',
            url: baseUrls.mainUrl + "subject/bylecture/" + lec
        });
    };

    return {
        GetAllLecture: getAllLecture,
        GetLectureHasSubject: getLectureHasSubject
    }
});
