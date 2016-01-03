angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService',
        function ($scope, $location, AuthService, UserRetrievalService) {

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();



            $scope.showEntireUser = function (){
                console.log("mainAppCtrl: " + $scope.authUser.username);
                UserRetrievalService.findRegisteredUser($scope.authUser.username);
                console.log( UserRetrievalService.findRegisteredUser($scope.authUser.username));
            }




            $scope.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }]);