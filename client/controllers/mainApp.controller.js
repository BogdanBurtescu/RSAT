var applicationContext = angular.module('myApp');

applicationContext
    .controller('mainAppController', mainAppFunction);

mainAppFunction.$inject = [
    '$scope',
    '$location',
    'AuthService',
    'SocketConnectionService',
    'GeographyService',
    'UserService'
];

function mainAppFunction($scope, $location, AuthService, SocketConnectionService,
                         GeographyService, UserService)
{

    getNumberOfUsers();
    initializeUserCredentials();
    getNumberOfGeographicEntities();

    $scope.mainAppName = "RSAT";
    $scope.authUser = AuthService.getAuthorizedUser();
    $scope.contentSelector = "default";
    $scope.currentNoOfUsersInDb = null;
    $scope.currentNoOfGeographicFeaturesInDb = null;
    $scope.loggedInUser = null;


    //socket listener active on every update of the number of users in the db
    SocketConnectionService.on('numberOfUsersSignal', function(data) {
        $scope.currentNoOfUsersInDb = data.numberOfUsers;
    });

    SocketConnectionService.on('numberOfGeographicalEntitiesSignal', function(data) {
        $scope.currentNoOfGeographicFeaturesInDb = data.numberOfGeographicalEntities;
    });


    //function that makes available the data to be input in the top right corner user box
    function initializeUserCredentials() {
        UserService.findRegisteredUser($scope.authUser).then(
            function(data) {
                $scope.loggedInUser = data;
            }
        );
    }

    //function to transfer the main div view to the user information one
    $scope.showEntireUser = function() {
        $scope.contentSelector = 'user';
    };

    //function to retrieve the number of users existent in the database when rendering the page
    function getNumberOfUsers() {
        UserService.getNumberOfUsers().then(
            function(data) {
                $scope.currentNoOfUsersInDb = data.numberOfUsers;
            }
        );
    }

    function getNumberOfGeographicEntities() {
        GeographyService.getNumberOfGeographicEntities().then(
            function(data) {
                $scope.currentNoOfGeographicFeaturesInDb = data.numberOfGeographicFeatures;
            }
        );
    }

    $scope.logout = function() {
        // call logout from service
        AuthService.logout()
            .then(function() {
                $location.path('/login');
            });

    };

    $scope.goToDashboard = function() {
        $scope.contentSelector = "default";
    };

    $scope.goToGeographyData = function() {
        $scope.contentSelector = "geographyData";
    };

    $scope.goToAdaptationData = function() {
        $scope.contentSelector = "adaptationData";
    };

    $scope.goToWeatherData = function() {
        $scope.contentSelector = "weatherData";
    };

    $scope.goToAirspaceView = function() {
        $scope.contentSelector = "airspace";
    };

    $scope.goToFlightDataView = function() {
        $scope.contentSelector = "flightData";
    };

    $scope.goToSimulationView = function() {
        $scope.contentSelector = "simulation";
    };



}
