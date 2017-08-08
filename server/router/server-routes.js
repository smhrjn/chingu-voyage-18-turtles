
module.exports = (app, db) => {
  // get old messages
  app.get('/messages', (req, res) => {
    console.log('getting messages');
    db.collection('chatroom-chats')
      .find({ })
      .toArray((err, docs) => {
        if (err) {
          console.log('could not get documents');
          return res.json({
            err: 'error obtaining data'
          });
        };
        // console.log(docs);
        return res.json(docs);
      });
  });

  app.get('/', (req, res) => {
    return res.send('Chat Server');
  });
};
