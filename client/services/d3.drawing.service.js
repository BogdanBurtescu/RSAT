var applicationContext = angular.module('myApp');
var serviceName = 'DrawingService';

applicationContext
    .factory(serviceName, DrawingService);

DrawingService.$inject = ['d3', '$http', 'ServerCommunication'];

function DrawingService(d3, $http, ServerCommunication) {



    return ({
        createMercatorProjection: createMercatorProjection,
        initSvg: initSvg,
        createPath: createPath,
        drawFeature: drawFeature
    });


    function createPath(projection)
    {
        var path = d3.geo.path()
            .projection(projection);
        return path;
    }

    function initSvg(divId, width, height)
    {
        var svg = d3.select('#'.concat(divId)).append('svg')
            .attr('width', width)
            .attr('height', height)
            .style("border", "1px solid silver");

        return svg;
    }

    function createMercatorProjection()
    {
        var projection = d3.geo.mercator()
            .scale(1)
            .translate([0, 0]);
        return projection
    }

    function drawFeature(projection, path, svg, featureId, url)
    {
        var g = svg.append('g');
        var featureToDraw = null;

        ServerCommunication.initPostRequest(url, {featureId: featureId},
            function(response) {
                featureToDraw = response.data[0];
                var featureCollection = {
                    "type": "FeatureCollection",
                    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},

                    "features": [featureToDraw]
                };

                fitFeatureToDiv(projection, path, svg, featureCollection);

            });

    }

    function fitFeatureToDiv(projection, path, svg, featureCollection)
    {
        var b = path.bounds(featureCollection.features[0]),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        svg.selectAll("path")
            .data(featureCollection.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "rgb(224, 224, 224)")
            .style("stroke", "black")
            .style("stroke-width", "0.3");
    }
}
