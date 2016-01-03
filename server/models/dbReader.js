var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    mongojs = require('mongojs'),
    db = mongojs('mean-auth', ['users']);



exports.searchForUser = function (){
    db.users.find(function(err, docs) {
        console.log(docs);
    })
}