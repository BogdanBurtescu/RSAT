var myApp = angular.module('myApp', ['ngRoute', 'angularFileUpload']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: {
                restricted: false
            }
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController',
            access: {
                restricted: false
            }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {
                restricted: true
            }
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'registerController',
            access: {
                restricted: false
            }
        })
        .when('/main', {
            templateUrl: 'partials/mainAppView.html',
            controller: 'mainAppController',
            access: {
                restricted: true
            }
        })
        .when('/userInformation', {
            templateUrl: 'partials/userInformation.html',
            controller: 'userInformationController',
            access: {
                restricted: true
            }
        })
        .when('/geographyData', {
            templateUrl: 'partials/geographyData.view.html',
            access: {
                restricted: true
            }
        })

        .otherwise({
            redirectTo: '/'
        });
});


myApp.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/');
        }
    });
});