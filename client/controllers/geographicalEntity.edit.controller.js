var applicationContext = angular.module('myApp');
var controllerName = "geographicalEntityEdit";

applicationContext
    .controller(controllerName, geographicalEntityEdit);

geographicalEntityEdit.$inject =
    [
        '$scope',
        '$routeParams',
        'DrawingService',
        'ServerCommunication'
    ];

function geographicalEntityEdit($scope, $routeParams, DrawingService, ServerCommunication)
{
    $scope.geographicalEntityId = $routeParams._id;

    $scope.geographicalEntity = null;

        ServerCommunication.initPostRequest('/geography/geographicEntityEdit', {featureId: $scope.geographicalEntityId}, function(response){
            $scope.geographicalEntity = response.data[0];
            console.log($scope.geographicalEntity);
    });

    var divWidth = document.getElementById('map').clientWidth;
    var divHeight = document.getElementById('map').clientHeight;

    var projection = DrawingService.createMercatorProjection();
    var svg = DrawingService.initSvg('map', divWidth, divHeight);
    var path = DrawingService.createPath(projection);
    DrawingService.drawFeature(projection, path, svg, $scope.geographicalEntityId, '/geography/geographicEntityEdit');

    DrawingService.initZoomAndPan(svg);

}