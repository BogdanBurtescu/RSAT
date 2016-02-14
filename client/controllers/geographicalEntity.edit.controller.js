var applicationContext = angular.module('myApp');
var controllerName = "geographicalEntityEdit";

applicationContext
    .controller(controllerName, geographicalEntityEdit);

geographicalEntityEdit.$inject =
    [
        '$scope',
        '$routeParams'
    ];

function geographicalEntityEdit($scope, $routeParams)
{
        $scope.geographicalEntityId = $routeParams._id;
}