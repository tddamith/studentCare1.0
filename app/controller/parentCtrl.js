/**
 * Created by **** on 10/23/2016.
 */

stuCareApp.controller('parentCtrl', function ($scope, notificationService, parentServices, loginService) {

    $scope.adveObj = {};
    $scope.advertisement = function () {
        return {
            all: function () {
                parentServices.getAllAdvertisement().then(function (res) {
                    if (res.status == 200) {
                        if (res.data.data) {
                            $scope.adveObj = res.data.data;
                        }

                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }
    }();
    $scope.advertisement.all();

    //
    $scope.parentObj = {};
    $scope.atteObj = {};
    $scope.parent = function () {

        var getStudentHasAttend = function (studentId) {
            parentServices.GetStudentHasAttend(studentId).then(function (res) {
                if (res.status == 200) {
                    if (res.data.data) {
                        $scope.atteObj = res.data.data;
                        console.log($scope.atteObj);
                    }
                }

            }, function (err) {
                console.log(err);
            });
        };

        return {
            getParentDetails: function (email) {
                parentServices.GetParentDetails(email).then(function (res) {
                    if (res.status == 200) {
                        if (res.data.data) {
                            $scope.parentObj = res.data.data;
                            console.log($scope.parentObj);
                            getStudentHasAttend($scope.parentObj.student.regNo);
                        }
                    }

                }, function (err) {
                    console.log(err);
                });
            },

        }
    }();
    $scope.parent.getParentDetails(loginService.getUserName());
});
