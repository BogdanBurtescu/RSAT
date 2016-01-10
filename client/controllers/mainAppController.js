angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService', 'SocketConnectionService', 'NoOfUsersRetrievalService',
        function ($scope, $location, AuthService, UserRetrievalService, SocketConnectionService, NoOfUsersRetrievalService) {

            //execute function to get number of users on controller load
            getNumberOfUsers();
            initializeUserCredentials();

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();
            $scope.contentSelector = "default";
            $scope.currentNoOfUsersInDb = null;
            $scope.loggedInUser = null;


            //socket listener active on every update of the number of users in the db
            SocketConnectionService.on('numberOfUsersSignal', function(data) {
                console.log("Nr de useri transmis prin semnal: " + data.numberOfUsers);
                $scope.currentNoOfUsersInDb = data.numberOfUsers;
            });



            //function that makes available the data to be input in the top right corner user box
            function initializeUserCredentials(){
                UserRetrievalService.findRegisteredUser($scope.authUser).then(
                    function(data) {
                        $scope.loggedInUser = data;
                        console.log($scope.loggedInUser);
                    }
                );
            }

            //function to transfer the main div view to the user information one
            $scope.showEntireUser = function (){
                $scope.contentSelector = 'user';
            };

            //function to retrieve the number of users existent in the database when rendering the page
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

            $scope.goToGeographyData = function () {
                $scope.contentSelector = "geographyData";
            };

            $scope.goToAdaptationData = function () {
                $scope.contentSelector = "adaptationData";
            };

            $scope.goToWeatherData = function () {
                $scope.contentSelector = "weatherData";
            };

        }])

    .directive('adaptationDataView', function() {
        return {

            templateUrl: '../partials/views/adaptationData.view.html'
        };
    })

    .directive('geographyDataView', function() {
        return {

            templateUrl: '../partials/views/geographyData.view.html'
        };
    })

    .directive('weatherDataView', function() {
        return {

            templateUrl: '../partials/views/weatherData.view.html'
        };
    })

    .directive('userInformationView', function() {
        return {

            templateUrl: '../partials/views/userInformation.view.html'
        };
    })

