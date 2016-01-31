var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/User.model.js'),
    mongojs = require('mongojs'),
    config = require('../configs/database.config.js')
    db = mongojs(config.DatabaseConfig.databaseName, config.DatabaseConfig.databaseCollections),
    multer = require('multer');

router.post('/register', function(req, res) {
    var socketio = req.app.get('socketio');
    User.register(new User({ username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfCreation: req.body.dateOfCreation}), req.body.password,  function(err, account) {
        if (err) {
            return res.status(500).json({err: err});
        }
        //execute query for number of users in db to send via socket.io
        db.users.count(function(error, numberOfDocuments) {
            socketio.sockets.emit('numberOfUsersSignal',
                {numberOfUsers: numberOfDocuments}); // emit an event for all connected clients
        });


        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration successful!'});
        });
    });
});

router.get('/findUser', function(req, res) {
    db.users.find({username: req.user.username}).forEach(function (err, doc) {
        if (doc) {
            res.json(doc);
        }
    })
});

router.get('/numberOfUsers', function(req, res) {
    var socketio = req.app.get('socketio');

    db.users.count(function(error, numberOfDocuments) {
        // Do what you need the count for here.
        socketio.sockets.emit('numberOfUsersSignal',
            {numberOfUsers: numberOfDocuments}); // emit an event for all connected clients
        res.json({numberOfUsers: numberOfDocuments})
    });
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