#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    socketio = require('socket.io');




app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = socketio.listen(server);
app.set('socketio', io);
console.log("RSAT Server started on port " + app.get('port'));
