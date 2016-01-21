var shapefileStream = require('shapefile-stream'),
    app = require('../../app'),
    express = require('express'),
    router = express.Router(),
    through = require('through2'),
    mongojs = require('mongojs'),
    db = mongojs('mean-auth', ['users', 'countries']);

var countryTableFormat = {
    type: null,
    entityName: null,
    continent: null,
    subregion: null,
    geometry: null
};


exports.parseShp = function(filePath){
    var shpFeatures = [];
    shapefileStream.createReadStream(filePath)
    .pipe( through.obj( function( data, enc, next ) {
        shpFeatures.push(data);
        db.countries.find(data, function(err, docs){
            if(docs.length){
                console.log("Entry already exists in the DB");
            }else{
                writeRecordInMongo(data);
                countryTableFormat._id = data._id;
                countryTableFormat.type = data.type;
                countryTableFormat.entityName = data.properties.ADMIN;
                countryTableFormat.continent = data.properties.CONTINENT;
                countryTableFormat.geometry = data.geometry.type;
                countryTableFormat.subregion = data.properties.SUBREGION;
                countryTableFormat.geometryCoordinates = data.geometry.coordinates;
                    var socketio = app.get('socketio');
                        socketio.sockets.emit('countriesSignal', countryTableFormat); // emit an event for all connected clients


                console.log("FEATURES!");
                console.log(shpFeatures.length);
            }
        });
        next();
    }));


};

function writeRecordInMongo(iRecord){
    db.countries.insert(iRecord);
    db.countries.count(function(error, numberOfDocuments) {
        //console.log("Inserted " + numberOfDocuments + " records in DB");
    });
}