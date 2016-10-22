/**
 * Created by **** on 10/21/2016.
 */

stuCareApp.controller('loginCtrl', function ($scope, loginService,notificationService,$state) {

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
                $scope.objSignUp.confirm_password = $scope.objSignUp.password;
                $scope.objSignUp.contact_no = '0771234567'; 
                loginService.SignUpMe($scope.objSignUp).then(function (response) {
                   var data = response.data
                   if (data.status) {
                        notificationService.success('successfully Sign up'); 
                        $scope.clickSignIn.goToSignIn()
                   }else{
                        notificationService.error(data.message)
                   }
                }, function (err) {
                     notificationService.error('network error occured. please try again later !!!')
                });
            },
            signInMe : function(){
                loginService.signInMe($scope.objSignIn).then(function(response){
                    var data = response.data;
                    console.log(data)
                    if (data.status) {
                        setCookie(data.data); 
                        notificationService.success('successfully logged in');   
                        (data.data.type === 'admin')? $state.go('dashboard.admin') : $state.go('dashboard');
                    }
                    else{                
                       notificationService.error('incorrect username or password !!!')
                    }
                },function(response){           
                    notificationService.error('network error occured. please try again later !!!')
                })
            }
        }

    }();

    /*
        set login credential to the 'authdata' cookies
    */ 

    var setCookie = function(_obj){
        var d = new Date(),
            exdays = 1;
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie =  'authData='+JSON.stringify(_obj) + ";" + expires + ";path=/";
    }


});

