var app = require('../app'),
    multer = require('multer'),
    shapefileStream = require('shapefile-stream'),
    through = require('through2'),
    fs = require('fs'),
    path = require('path'),
    shpFileParser = require('./components/ShpFileParser.js'),
    csvFileParser = require('./components/CsvFileParser.js');

exports.uploaderService = function(routePath)
{

//fileStoragePath = uploads/
    //routePath = /fileUploadService



//define storage and upload instances
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });
    var upload = multer({ storage: storage });


    app.post('/fileUploadService', upload.single('file'), function(req,res){
        console.log("Finished uploading: " + req.file.originalname);
        console.log("File path: " + req.file.path);

        if(path.extname(req.file.originalname) === ".shp"){
            shpFileParser.parseShp(req.file.path);
        }
        if(path.extname(req.file.originalname) === ".csv"){
            csvFileParser.parseCsv(req.file.path);
        }
        res.status(204).end();
    });
}