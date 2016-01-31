var express = require('express'),
    app = require('../app.js'),
    router = express.Router(),
    passport = require('passport'),
    mongojs = require('mongojs'),
    config = require('../configs/database.config.js'),
    db = mongojs(config.DatabaseConfig.databaseName, config.DatabaseConfig.databaseCollections),
    multer = require('multer'),
    GeographicEntity = require('../models/GeographicEntity.model.js');


router.get('/numberOfGeographicEntities', function(req, res) {
    db.GEOGRAPHICAL_ENTITIES.count(function(error, numberOfDocuments) {
        res.json({numberOfGeographicFeatures: numberOfDocuments})
    });
});

router.get('/geographicEntity', function(req, res) {
    var listOfGeographicEntities = [];
    db.GEOGRAPHICAL_ENTITIES.find({}, function(err, documents){
        documents.forEach(function(document){

            var geographicEntity = new GeographicEntity(document._id,
                document.type,
                document.properties.ADMIN,
                document.properties.CONTINENT,
                document.geometry.type,
                document.properties.SUBREGION,
                document.geometry.coordinates);
            listOfGeographicEntities.push(geographicEntity);
        });
        res.json(listOfGeographicEntities);

    })

});

router.post('/deleteGeographicEntity', function(req, res) {
    var socketio = req.app.get('socketio');

    console.log(req.body.geographicEntityId);
    console.log(typeof req.body.geographicEntityId);

    db.GEOGRAPHICAL_ENTITIES.remove({"_id": db.ObjectId(req.body.geographicEntityId)}, function(err, docs) {  //db.users.remove({"_id": ObjectId("4d512b45cc9374271b02ec4f")});
        if (err) return err;
        console.log(docs);
    });
    db.GEOGRAPHICAL_ENTITIES.count(function(error, numberOfDocuments) {
        // Do what you need the count for here.
        socketio.sockets.emit('numberOfGeographicalEntitiesSignal',
            {numberOfGeographicalEntities: numberOfDocuments}); // emit an event for all connected clients
        console.log("SIGNAL EMITTTEd");
    });
    res.end();
});

router.get('/deleteAllGeographicEntities', function(req, res){
    var socketio = req.app.get('socketio');
    db.GEOGRAPHICAL_ENTITIES.drop(function(){
        console.log("Collection dropped");
    })
    db.GEOGRAPHICAL_ENTITIES.count(function(error, numberOfDocuments) {
        // Do what you need the count for here.
        socketio.sockets.emit('numberOfGeographicalEntitiesSignal',
            {numberOfGeographicalEntities: numberOfDocuments}); // emit an event for all connected clients
        console.log("SIGNAL EMITTTEd");
    });
})




module.exports = router;