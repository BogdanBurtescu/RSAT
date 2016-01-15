var shapefileStream = require('shapefile-stream'),
    through = require('through2'),
    mongojs = require('mongojs'),
    db = mongojs('mean-auth', ['users', 'countries']);


    exports.parseShp = function(filePath){
    var shpFeatures = [];
    shapefileStream.createReadStream(filePath)
    .pipe( through.obj( function( data, enc, next ){
        shpFeatures.push(data);
        db.countries.find(data, function(err, docs){
            if(docs.length){
                console.log("Entry already exists in the DB");
            }else{
                writeRecordInMongo(data);
            }
        })

        next();

    }));

}


function writeRecordInMongo(iRecord){
    db.countries.insert(iRecord);
    db.countries.count(function(error, numberOfDocuments) {
        console.log("Inserted " + numberOfDocuments + " records in DB");
    });
}