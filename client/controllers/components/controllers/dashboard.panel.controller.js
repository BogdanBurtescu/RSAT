var applicationContext = angular.module('myApp');


applicationContext
    .controller('dashboardPanelController', DashboardPanel);

DashboardPanel.$inject = [
    '$scope',
    'SocketConnectionService',
    'GeographyService',
    'UserService',
    '$location'
];

function DashboardPanel($scope, SocketConnectionService,
                        GeographyService, UserService, $location)
{

    getNumberOfUsers();
    getNumberOfGeographicEntities();

    $scope.mainAppName = "RSAT";
    $scope.contentSelector = "default";
    $scope.currentNoOfUsersInDb = null;
    $scope.currentNoOfGeographicFeaturesInDb = null;


    //socket listener active on every update of the number of users in the db
    SocketConnectionService.on('numberOfUsersSignal', function(data) {
        $scope.currentNoOfUsersInDb = data.numberOfUsers;
    });

    SocketConnectionService.on('numberOfGeographicalEntitiesSignal', function(data) {
        $scope.currentNoOfGeographicFeaturesInDb = data.numberOfGeographicalEntities;
    });




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


    $scope.goToGeographyData = function() {
        $location.path('/geography');

    };

    $scope.goToAdaptationData = function() {
        $location.path('/adaptation');

    };

    $scope.goToWeatherData = function() {
        $location.path('/weather');

    };
}

