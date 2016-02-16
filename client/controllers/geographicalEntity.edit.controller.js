var applicationContext = angular.module('myApp');
var controllerName = "geographicalEntityEdit";

applicationContext
    .controller(controllerName, geographicalEntityEdit);

geographicalEntityEdit.$inject =
    [
        '$scope',
        '$routeParams',
        'd3',
        'GeographyService',
        '$http'
    ];

function geographicalEntityEdit($scope, $routeParams, d3, GeographyService, $http)
{
        $scope.geographicalEntityId = $routeParams._id;
        setMapInstance();




    function setMapInstance()
    {


        var width = document.getElementById("map").clientWidth;
        console.log(width);

        var height = document.getElementById("map").clientHeight;
        console.log(height);


        var projection = d3.geo.mercator()
            .scale(1)
            .translate([0, 0]);


        var svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height)
            .style("border", "1px solid silver");



        var path = d3.geo.path()
            .projection(projection);

        var g = svg.append('g');

        $scope.feature = null;

        initGeo();
        // load and display the World
        //d3.json($scope.feature, function(json) {
        //    //Bind data and create one path per GeoJSON feature
        //    svg.selectAll("path")
        //        .data(json.features)
        //        .enter()
        //        .append("path")
        //        .attr("d", path)
        //        .attr("fill", "rgb(224, 224, 224)")
        //        .style("stroke", "black")
        //        .style("stroke-width", "0.3");
        //});

        function initGeo()
        {
            var req = {
                method: 'POST',
                url: '/geography/geographicEntity',
                data: {geographicEntityId: $scope.geographicalEntityId}
            }

            $http(req)
                .then(
                    function(response)
                    {
                        $scope.feature = response.data[0];
                        console.log($scope.feature);


                        var cacat = {
                            "type": "FeatureCollection",
                            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

                            "features": [$scope.feature]
                        };

                        // using the path determine the bounds of the current map and use
                        var b = path.bounds($scope.feature),
                            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

                        projection
                            .scale(s)
                            .translate(t);

                            //Bind data and create one path per GeoJSON feature
                            svg.selectAll("path")
                                .data(cacat.features)
                                .enter()
                                .append("path")
                                .attr("d", path)
                                .attr("fill", "rgb(224, 224, 224)")
                                .style("stroke", "black")
                                .style("stroke-width", "0.3");
                    });

        }
    }

}