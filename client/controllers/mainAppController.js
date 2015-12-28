angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();

        }]);