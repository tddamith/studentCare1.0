/**
 * Created by **** on 10/21/2016.
 */

stuCareApp.controller('loginCtrl', function ($scope, loginService) {

    //##SIGN IN FUNCTIONS
    $scope.clickSignIn = function () {
        return {
            goToSignUp: function () {
                $('#signIn').addClass('display-none');
                $('#signUp').removeClass('display-none');
            },
            goToSignIn: function () {
                $('#signUp').addClass('display-none');
                $('#signIn').removeClass('display-none');
            }
        }
    }();


    //##SIGN UP FUNCTIONS
    $scope.objSignUp = {};
    $scope.clickSignUp = function () {
        return {
            signUpMe: function () {
                $scope.objSignUp.confirm_password = '1234';
                $scope.objSignUp.contact_no = '0771234567';
                console.log($scope.objSignUp);
                loginService.SignUpMe($scope.objSignUp).then(function (data) {
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
            }
        }

    }();

});

