angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();

            $scope.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }]);