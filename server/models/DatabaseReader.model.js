var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('User.model.js'),
    mongojs = require('mongojs'),
    config = require('../configs/database.config.js'),
    db = mongojs(config.DatabaseConfig.databaseName, config.DatabaseConfig.databaseCollections);



exports.searchForUser = function (element){
    // iterate over all whose level is greater than 90.
    db.users.find({username: element.username}).forEach(function (err, doc) {
        if (doc) {
            console.log("USER FOUND");
            return doc;
        }

        // doc is a document in the collection
    })
}