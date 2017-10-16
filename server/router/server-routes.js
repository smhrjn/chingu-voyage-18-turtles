module.exports = (app, db) => {
  // get old messages
  app.get('/messages', (req, res) => {
    console.log('getting messages');
    db.collection('chatroom-chats')
      .find({})
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

  // create user
  app.post('/user/new', (req, res) => {
    console.log('creating user');
    db.collection('users')
      .insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }, (err, result) => {
        if (err) {
          console.log('cannot create user');
          return res.json({
            error: 'Cannot Create User'
          });
        }
        res.json({
          message: 'user created!',
          userId: result._id
          // token: token
        });
      });
    console.log('user created.');
  });
};
