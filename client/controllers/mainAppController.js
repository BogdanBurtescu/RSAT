angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService', 'SocketConnectionService', 'NoOfUsersRetrievalService',
        function ($scope, $location, AuthService, UserRetrievalService, SocketConnectionService, NoOfUsersRetrievalService) {

            //execute function to get number of users on controller load
            getNumberOfUsers();




            $scope.loggedInUser = null;
            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();
            $scope.contentSelector = "default";
            $scope.currentNoOfUsersInDb = null;

            //socket listener active on every update of the number of users in the db
            SocketConnectionService.on('numberOfUsersSignal', function(data) {
                console.log("Nr de useri transmis prin semnal: " + data.numberOfUsers);
                $scope.currentNoOfUsersInDb = data.numberOfUsers;
            });


            $scope.showEntireUser = function (){
                $scope.contentSelector = 'user';
                UserRetrievalService.findRegisteredUser($scope.authUser).then(
                    function(data) {
                        $scope.loggedInUser = data;
                        console.log($scope.loggedInUser);
                    }
                );
            };

            function getNumberOfUsers() {
                NoOfUsersRetrievalService.getNumberOfUsers().then(
                    function(data) {
                        $scope.currentNoOfUsersInDb = data.numberOfUsers;
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