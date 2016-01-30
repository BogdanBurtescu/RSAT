#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    socketio = require('socket.io'),
    multer = require('multer'),
    path = require('path'),
    fileUploaderService = require('./services/FileUploader.js');


fileUploaderService.initUploaderService('/fileUploadService');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('RSAT server listening on port ' + server.address().port);
});

var io = socketio.listen(server);
app.set('socketio', io);
