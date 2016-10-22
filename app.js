/**
 * Created by **** on 10/20/2016.
 */

var stuCareApp = angular.module('stuCareApp', ['ngRoute', 'jlareau.pnotify', 'ui.bootstrap', 'ui.router']);


//app router
stuCareApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/views/dashboard.html",
            controller: 'mainCtrl',
            data: {
                requireLogin: true,
            }
        }).state('dashboard.admin', {
            url: "/admin",
            templateUrl: "app/views/admin.html",
            data: {
                requireLogin: true,
                navigation: "ADMIN"
            }
        }).state('dashboard.parent', {
            url: "/parent",
            templateUrl: "app/views/parent.html",
            data: {
                requireLogin: true,
                navigation: "PARENT"
            }
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
    'loginUrl': 'http://build.duoworld.com:3030/',
    'mainUrl': 'http://build.duoworld.com:3030/'

};
stuCareApp.constant('baseUrls', baseUrls);


//Authentication
stuCareApp.run(function ($rootScope, loginService, $location, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        var userAuth = toState.data.navigation;

        if (requireLogin) {
            if (!loginService.cookieStatus()) {
                event.preventDefault();
                $state.go('login');
            }
            // get me a login modal!
        }

        if (userAuth) {
            if (userAuth == loginService.getType()) {
                //if ('ADMIN' == loginService.getType()) {
                //    event.preventDefault();
                //    $state.go('dashboard.admin');
                //    return;
                //}
                //if ('PARENT' == loginService.getType()) {
                //    event.preventDefault();
                //    $state.go('/dashboard.parent');
                //    return;
                //}
            }
        }
    });
});

