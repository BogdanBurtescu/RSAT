angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService',
        function ($scope, $location, AuthService, UserRetrievalService) {
            var socket = io.connect('http://localhost:3000');
            socket.on('news', function (data) {
                console.log(data);
            });
            $scope.loggedInUser = null;
            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();
            $scope.contentSelector = "default";

            $scope.showEntireUser = function (){
                $scope.contentSelector = 'user';
                UserRetrievalService.findRegisteredUser($scope.authUser).then(
                    function(data) {
                        $scope.loggedInUser = data;
                        console.log($scope.loggedInUser);
                    }
                );


            };

            $scope.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

            $scope.goToDashboard = function () {
                $scope.contentSelector = "default";
            };

        }]);