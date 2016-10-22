/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices, notificationService) {

    //#STUDENT FUNCTION
    $scope.student = function () {
        return {
            openMode: function () {
                $('#studentModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#studentModel').addClass('display-none');
            }
        }
    }();

    //#ADVERTISEMENT FUNCTION
    $scope.advert = {};
    var getCurrent = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }

        return {
            time: function () {
                return hour + ':' + minute + ':' + second;
            },
            date: function () {
                return year + '/' + month + '/' + day
            }
        }
    }();

    $scope.advert.date = getCurrent.date();
    $scope.advert.time = getCurrent.time();
    $scope.advertisement = function () {
        return {
            openMode: function () {
                $('#advertisementModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#advertisementModel').addClass('display-none');
            },
            changeYear: function (year) {
                $scope.subjectObj = [];
                if (year != "") {
                    studentServices.GetSubjectId(year).then(function (res) {
                        if (res.data.data) {
                            $scope.subjectObj = res.data.data;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        }
    }();
});