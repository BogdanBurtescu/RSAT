angular.module('myApp').controller('mainAppController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService', 'SocketConnectionService', 'NoOfUsersRetrievalService', 'CountryRetrievalService', 'NoOfGeographicFeaturesService',
        function ($scope, $location, AuthService, UserRetrievalService, SocketConnectionService, NoOfUsersRetrievalService, CountryRetrievalService, NoOfGeographicFeaturesService) {

            //execute function to get number of users on controller load
            getNumberOfUsers();
            initializeUserCredentials();
            getCountriesInformation();
            getNumberOfGeographicFeatures();

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();
            $scope.contentSelector = "default";
            $scope.currentNoOfUsersInDb = null;
            $scope.currentNoOfGeographicFeaturesInDb = null;
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

            function getNumberOfGeographicFeatures() {
                NoOfGeographicFeaturesService.getNumberOfGeographicFeatures().then(
                    function(data) {
                        console.log(data);
                        $scope.currentNoOfGeographicFeaturesInDb = data.numberOfGeographicFeatures;
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

            $scope.goToAirspaceView = function () {
                $scope.contentSelector = "airspace";
            };

            $scope.goToFlightDataView = function () {
                $scope.contentSelector = "flightData";
            };

            $scope.goToSimulationView = function () {
                $scope.contentSelector = "simulation";
            };

            function getCountriesInformation() {
                CountryRetrievalService.getCountries().then(
                    function(data) {
                        $scope.geographicalEntities = data;
                        console.log("Finished uploading the country information data");
                    }
                );
            }

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

    .directive('airspaceView', function() {
        return {

            templateUrl: '../partials/views/airspace.view.html'
        };
    })

    .directive('flightDataView', function() {
        return {

            templateUrl: '../partials/views/flightData.view.html'
        };
    })

    .directive('simulationView', function() {
        return {

            templateUrl: '../partials/views/simulation.view.html'
        };
    })

    .directive('mainView', function() {
        return {

            templateUrl: '../partials/views/main.view.html'
        };
    })

    .directive('mainMenuComponent', function() {
        return {

            templateUrl: '../partials/views/components/mainMenu.component.html'
        };
    })

