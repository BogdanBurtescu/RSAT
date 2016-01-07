var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js'),
    mongojs = require('mongojs'),
    db = mongojs('mean-auth', ['users']),
    dbreader = require('../models/dbReader');



// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mean-auth';
    router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfCreation: req.body.dateOfCreation}), req.body.password,  function(err, account) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {


            return res.status(200).json({status: 'Registration successful!'});
        });
    });
});

router.get('/findUser', function(req, res) {
    var socketio = req.app.get('socketio');
    socketio.sockets.emit('news', {article: 'article'}); // emit an event for all connected clients
    console.log('event emitted');

    db.users.find({username: req.user.username}).forEach(function (err, doc) {
        if (doc) {
            res.json(doc);
        }
    })
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;