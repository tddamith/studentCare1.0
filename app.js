/**
 * Created by **** on 10/20/2016.
 */

var stuCareApp = angular.module('stuCareApp', ['ngRoute','jlareau.pnotify', 'ui.bootstrap', 'ui.router']);


//app router
stuCareApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/views/dashboard.html",
            controller : 'mainCtrl'
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


