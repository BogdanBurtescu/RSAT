#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    socketio = require('socket.io'),
    multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

app.post('/uploads', upload.single('file'), function(req,res){
  console.log("Finished uploading: " + req.file.originalname); //form files
  res.status(204).end();
});



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});



var io = socketio.listen(server);
app.set('socketio', io);
console.log("RSAT Server started on port " + app.get('port'));
