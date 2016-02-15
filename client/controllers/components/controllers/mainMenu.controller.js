var applicationContext = angular.module('myApp');


applicationContext
    .controller('mainMenuController', mainMenu);

mainMenu.$inject = [
    '$scope',
    '$location',
    'AuthService',
    'UserService'
];

function mainMenu($scope, $location, AuthService, UserService)
{

    //initializeUserCredentials();

    $scope.authUser = AuthService.getAuthorizedUser();
    $scope.loggedInUser = null;

    initializeUserCredentials();


    function initializeUserCredentials() {
        UserService.findRegisteredUser($scope.authUser).then(
            function(data) {
                $scope.loggedInUser = data;
            }
        );
    }
    $scope.goToAirspaceView = function() {
        $location.path('/airspace');

    };

    $scope.goToFlightDataView = function() {
        $location.path('/flightData');

    };

    $scope.goToSimulationView = function() {
        $location.path('/simulation');

    };

    $scope.goToDashboard = function() {
        $location.path('/dashboard');

    };


    $scope.logout = function() {
        // call logout from service
        AuthService.logout()
            .then(function() {
                $location.path('/login');
            });

    };

    //function to transfer the main div view to the user information one
    $scope.showEntireUser = function() {
        $location.path('/userInformation');

    };


}

