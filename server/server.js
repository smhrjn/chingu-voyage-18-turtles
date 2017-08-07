// const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongo = require('mongodb').MongoClient;

let db;
const port = process.env.PORT || 8080;
const dbUrl = 'mongodb://voyage:voyager@ds137540.mlab.com:37540/ng-chat';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

require('./router/server-routes.js')(app);

mongo.connect( dbUrl, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server running on port: ${ port }`);
    }
  });
});

function databaseStore(message) {
  let storeData = {
    chatMessage: message,
    timestamp: new Date().getTime()
  };
  db.collection('chatroom-chats').save(storeData, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
  });
}

app.get('/', (req, res) => {
  res.send('Chat Server');
});

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

http.listen(5000, () => {
  console.log('Server started on port 5000');
});
