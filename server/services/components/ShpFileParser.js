var shapefileStream = require('shapefile-stream'),
    through = require('through2');

exports.parseShp = function(filePath){
var shpFeatures = [];
    shapefileStream.createReadStream(filePath)
    .pipe( through.obj( function( data, enc, next ){
        shpFeatures.push(data);
        next();
        //app.get('/cacamaca', function(req, res){
        //    res.json(features);
        //})
    }))
}