/**
 * Created by **** on 10/20/2016.
 */

var stuCareApp = angular.module('stuCareApp', ['ngRoute', 'ui.bootstrap', 'ui.router']);


//app router
stuCareApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("console", {
            url: "/console",
            templateUrl: "app/views/console-view.html",
            data: {
                requireLogin: true
            }
        }).state("console.ticket", {
            url: "/ticket",
            templateUrl: "app/views/ticket/ticket-inbox.html"
        }).state('login', {
            url: "/login",
            templateUrl: "app/auth/login.html",
            data: {
                requireLogin: false
            }
        })
    }]);

//public API url
var baseUrls = {
    'loginUrl':'http://192.168.1.107:3000/'

};
stuCareApp.constant('baseUrls', baseUrls);


