var applicationContext = angular.module('myApp');

applicationContext
    .controller('logoutController', logoutMainFunction);

logoutMainFunction.$inject = [
    '$scope',
    '$location',
    'AuthService'
];

function logoutMainFunction($scope, $location, AuthService) {

    $scope.logout = function() {
        console.log(AuthService.getUserStatus());
        AuthService.logout()
            .then(function() {
                $location.path('/login');
            });
    };
}