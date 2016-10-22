/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices,notificationService) {

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
    $scope.advertisement = function () {
        return {
            openMode: function () {
                $('#advertisementModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#advertisementModel').addClass('display-none');
            }
        }
    }();
});