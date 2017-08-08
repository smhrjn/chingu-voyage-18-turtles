// const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongo = require('mongodb').MongoClient;
const cors = require('cors');

let db;
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;
const dbUrl = 'mongodb://voyage:voyager@ds137540.mlab.com:37540/ng-chat';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
if (env === 'development') {
  app.use(require('morgan')('dev'));
}

mongo.connect(dbUrl, (err, database) => {
  if (err) {
    return console.log(err);
  }
  console.log('connected to database');
  db = database;
  require('./router/server-routes.js')(app, db);
});

const databaseStore = message => {
  let storeData = {
    text: message,
    timestamp: new Date().getTime()
  };
  db.collection('chatroom-chats').save(storeData, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
  });
};

io.on('connection', socket => {
  console.log('user connected - socket');

  socket.on('disconnect', function() {
    console.log('user disconnected - socket');
  });

  socket.on('add-message', message => {
    io.emit('message', { type: 'new-message', text: message });
    // Function above that stores the message in the database
    databaseStore(message);
  });
});

// http.listen(5000, () => {
//   console.log('Server for socket started on port 5000');
// });

http.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server for Mongodb running on port: ${ port }`);
  }
});
