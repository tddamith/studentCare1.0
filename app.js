/**
 * Created by **** on 10/20/2016.
 */

var stuCareApp = angular.module('stuCareApp', ['ngRoute', 'ui.bootstrap',
    'ui.router', 'jlareau.pnotify',
    'ui.bootstrap.datetimepicker']);


//app router
stuCareApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/views/dashboard.html"
        }).state('dashboard.admin', {
            url: "/admin",
            templateUrl: "app/views/admin.html"
        }).state('login', {
            url: "/login",
            templateUrl: "app/auth/login.html"
        })
    }]);

//public API url
var baseUrls = {
    'loginUrl': 'http://192.168.1.107:3000/',
    'mainUrl': 'http://192.168.1.107:3000/'

};
stuCareApp.constant('baseUrls', baseUrls);


