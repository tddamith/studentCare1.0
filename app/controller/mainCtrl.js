/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices) {

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

});