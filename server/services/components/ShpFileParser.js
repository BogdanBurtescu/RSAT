var shapefileStream = require('shapefile-stream'),
    app = require('../../app'),
    express = require('express'),
    router = express.Router(),
    through = require('through2'),
    mongojs = require('mongojs'),
    config = require('../../configs/database.config.js'),
    db = mongojs(config.DatabaseConfig.databaseName,
                 config.DatabaseConfig.databaseCollections),
    GeographicEntity = require('../../models/GeographicEntity.model.js');



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
        db.GEOGRAPHICAL_ENTITIES.find(data, function(err, docs){
            if(docs.length){
                console.log("Entry already exists in the DB");
            }else{
                writeRecordInMongo(data);
                var geographicEntity = new GeographicEntity(data._id,
                                                            data.type,
                                                            data.properties.ADMIN,
                                                            data.properties.CONTINENT,
                                                            data.geometry.type,
                                                            data.properties.SUBREGION,
                                                            data.geometry.coordinates);
                    var socketio = app.get('socketio');
                        socketio.sockets.emit('geographicEntityUpdate', geographicEntity); // emit an event for all connected clients
                console.log("FEATURES!");
                console.log(shpFeatures.length);
            }
        });
        next();
    }));


};

function writeRecordInMongo(iRecord){
    db.GEOGRAPHICAL_ENTITIES.insert(iRecord);
    db.GEOGRAPHICAL_ENTITIES.count(function(error, numberOfDocuments) {
        //console.log("Inserted " + numberOfDocuments + " records in DB");
    });
}