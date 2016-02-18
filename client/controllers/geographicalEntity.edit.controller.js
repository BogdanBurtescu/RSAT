var applicationContext = angular.module('myApp');
var controllerName = "geographicalEntityEdit";

applicationContext
    .controller(controllerName, geographicalEntityEdit);

geographicalEntityEdit.$inject =
    [
        '$scope',
        '$routeParams',
        'DrawingService',
        'd3'
    ];

function geographicalEntityEdit($scope, $routeParams, DrawingService, d3)
{
    $scope.geographicalEntityId = $routeParams._id;

    var divWidth = document.getElementById('map').clientWidth;
    var divHeight = document.getElementById('map').clientHeight;

    var projection = DrawingService.createMercatorProjection();
    var svg = DrawingService.initSvg('map', divWidth, divHeight);
    var path = DrawingService.createPath(projection);
    DrawingService.drawFeature(projection, path, svg, $scope.geographicalEntityId, '/geography/geographicEntityEdit');

    DrawingService.initZoomAndPan(svg);

}