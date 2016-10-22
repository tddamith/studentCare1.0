/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices,notificationService,loginService) {

    $scope.userName = loginService.getUserName()

    //#STUDENT FUNCTION
 
    $scope.student = function () {
        return {
            openMode: function () { 
                $('#studentModel').removeClass('display-none'); 
                setBirthday();
            },  
            closeMode: function () {
                $('#studentModel').addClass('display-none'); 
            },
            saveMode: function(){
                $scope.student.birthday = $scope.bYear + '-' + $scope.bMonth + '-' + $scope.bDay;
                studentServices.newStudent($scope.student).then(function(response){
                    var data = response.data;
                    if (data.status) {
                        notificationService.success('successfully added new student');
                        $scope.student.closeMode();
                    }else{
                        notificationService.error(data.message);
                    }
                },function(response){
                    notificationService.error('network error occured. please try again later !!!')
                })
            }
        }
    }();

    var setBirthday = function(){
        $scope.bYear = '1993'
        $scope.bMonth = '1'
        $scope.bDay = '1'
    }

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