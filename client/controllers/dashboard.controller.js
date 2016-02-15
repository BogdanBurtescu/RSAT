var applicationContext = angular.module('myApp');

applicationContext
    .controller('dashboardController', Dashboard);

Dashboard.$inject = [
    '$scope',
    'SocketConnectionService',
    'GeographyService',
    'UserService'
];

function Dashboard($scope, SocketConnectionService,
                         GeographyService, UserService)
{



}
