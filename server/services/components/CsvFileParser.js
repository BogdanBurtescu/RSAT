var app = require('../../app'),
    multer = require('multer'),
    shapefileStream = require('shapefile-stream'),
    through = require('through2'),
    fs = require('fs'),
    path = require('path'),
    csvjson = require('csvjson');


exports.parseCsv = function(filePath){
    var caca = csvjson.toObject(filePath).output
        console.log(caca);
}