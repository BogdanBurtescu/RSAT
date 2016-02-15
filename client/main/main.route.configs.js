var applicationContext = angular.module('myApp', ['ngRoute', 'angularFileUpload', 'ui.bootstrap']);

applicationContext.config(function($routeProvider) {
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
        .when('/dashboard', {
            templateUrl: 'partials/views/dashboard.view.html',
            controller: 'dashboardController',
            access: {
                restricted: true
            }
        })
        .when('/userInformation', {
            templateUrl: 'partials/views/userInformation.view.html',
            controller: 'userInformationController',
            access: {
                restricted: true
            }
        })
        .when('/geography', {
            templateUrl: 'partials/views/geographyData.view.html',
            controller: 'geographyDataController',
            access: {
                restricted: true
            }
        })

        .when('/simulation', {
            templateUrl: 'partials/views/simulation.view.html',
            access: {
                restricted: true
            }
        })

        .when('/airspace', {
            templateUrl: 'partials/views/airspace.view.html',
            access: {
                restricted: true
            }
        })

        .when('/flightData', {
            templateUrl: 'partials/views/flightData.view.html',
            access: {
                restricted: true
            }
        })

        .when('/adaptation', {
            templateUrl: 'partials/views/adaptationData.view.html',
            access: {
                restricted: true
            }
        })

        .when('/weather', {
            templateUrl: 'partials/views/weatherData.view.html',
            access: {
                restricted: true
            }
        })



        .when('/geography/edit/:_id', {
            templateUrl: 'partials/views/geographicalEntity.edit.view.html',
            controller: 'geographicalEntityEdit',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});

applicationContext.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/');
        }
    });
});