var express = require('express'),
    app = require('../app.js'),
    router = express.Router(),
    passport = require('passport'),
    mongojs = require('mongojs'),
    config = require('../configs/database.config.js'),
    db = mongojs(config.DatabaseConfig.databaseName, config.DatabaseConfig.databaseCollections),
    multer = require('multer');


router.get('/numberOfGeographicEntities', function(req, res) {
    db.countries.count(function(error, numberOfDocuments) {
        res.json({numberOfGeographicFeatures: numberOfDocuments})
    });
});

router.get('/geographicEntity', function(req, res) {
    var listOfCountries = [];
    db.countries.find({}, function(err, countries){
        countries.forEach(function(country){
            var countryTableFormat = {
                _id: null,
                type: null,
                entityNase: null,
                continent: null,
                subregion: null,
                geometry: null,
                geometryCoordinates: null
            };
            countryTableFormat._id = country._id;
            countryTableFormat.type = country.type;
            countryTableFormat.entityName = country.properties.ADMIN;
            countryTableFormat.continent = country.properties.CONTINENT;
            countryTableFormat.geometry = country.geometry.type;
            countryTableFormat.subregion = country.properties.SUBREGION;
            countryTableFormat.geometryCoordinates = country.geometry.coordinates;
            listOfCountries.push(countryTableFormat);
        });
        res.json(listOfCountries);

    })

});

router.post('/deleteGeographicEntity', function(req, res) {

    console.log(req.body.geographicEntityId);
    console.log(typeof req.body.geographicEntityId);

    db.countries.remove({"_id": db.ObjectId(req.body.geographicEntityId)}, function(err, docs) {  //db.users.remove({"_id": ObjectId("4d512b45cc9374271b02ec4f")});
        if (err) return err;
        console.log(docs);
    });
    res.end();
});


router.get('/geographicEntity', function(req, res) {

    var listOfCountries = [];
    db.countries.find({}, function(err, countries){
        countries.forEach(function(country){
            var countryTableFormat = {
                _id: null,
                type: null,
                entityName: null,
                continent: null,
                subregion: null,
                geometry: null,
                geometryCoordinates: null
            };
            countryTableFormat._id = country._id;
            countryTableFormat.type = country.type;
            countryTableFormat.entityName = country.properties.ADMIN;
            countryTableFormat.continent = country.properties.CONTINENT;
            countryTableFormat.geometry = country.geometry.type;
            countryTableFormat.subregion = country.properties.SUBREGION;
            countryTableFormat.geometryCoordinates = country.geometry.coordinates;
            listOfCountries.push(countryTableFormat);
        });

        res.json(listOfCountries);



    })

});

module.exports = router;