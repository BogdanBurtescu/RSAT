// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy,
    multer = require('multer'),
    config = require('../server/configs/Config.js'),
    mongojs = require('mongojs');



var databaseConnectionURL = config.DatabaseConfig.databaseUrl;
mongoose.connect(databaseConnectionURL);

// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();



// require routes
var userRoutes = require('./routes/authentication.routes.js');
var geographyRoutes = require('./routes/geography.routes.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/user/', userRoutes);
app.use('/geography/', geographyRoutes);





app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

//// error hndlers
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//app.use(function(err, req, res) {
//  res.status(err.status || 500);
//  res.end(JSON.stringify({
//    message: err.message,
//    error: {}
//  }));
//});



module.exports = app;
