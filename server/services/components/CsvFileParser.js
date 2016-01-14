var csvjson = require('csvjson');


exports.parseCsv = function(filePath){
    var caca = csvjson.toObject(filePath).output
        console.log(caca);
}