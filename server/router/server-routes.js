const jwt = require('jsonwebtoken');
const pass = require('../../config/config.js');
const tokenCheck = require('../middleware/token-check.js');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  // create user
  app.post('/user', (req, res) => {
    let newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    // create a todo, information comes from AJAX request from VUE
    newuser.save((err) => {
      if (err) {
        console.log('error: ' + err);
        return res.json({ error: 'Cannot Create User' });
      }
      // const token = jwt.sign(newuser, pass.secret, { issuer: newuser.id.toString(), expiresIn: '1h' });
      res.json({
        message: 'user created!',
        userId: newuser._id
        // token: token
      });
      console.log('user created.');
    });
  });

  // user login
  app.post('/login', (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {
      if (err) return res.send('Error' + err);
      if (!user) {
        res.json({
          error: 'User not found'
        });
      } else if (user) {
        user.comparePw(req.body.password, (err, isMatch) => {
          if (err) return res.send('Error' + err);

          if (!isMatch) res.json({ error: 'Wrong password.' });

          else {
            // const token = jwt.sign(user, pass.secret, { issuer: user.id.toString(), expiresIn: 120 });
            const token = jwt.sign(user, pass.secret, { issuer: user.id.toString(), expiresIn: '1h' });
            // console.log('sending login response');
            res.json({
              message: 'Signed In.',
              userId: user._id,
              token: token
            });
          }
        });
      }
    });
  });

  // update password
  app.put('/login', tokenCheck, (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {
      if (err) {
        console.log(err);
        return res.json({ error: err });
      };
      if (!user) {
        res.json({
          error: 'User not found'
        });
      } else if (user) {
        user.comparePw(req.body.oldpassword, (err, isMatch) => {
          if (err) return res.status(400).send( { error: 'missing data' });

          if (!isMatch) res.json({ error: 'Wrong password.' });

          else {
            user.password = req.body.newpassword;
            user.save((err) => {
              if (err) {
                console.log('error: ' + err);
                return res.json({ error: err });
              }
              res.json({
                message: 'password updated.'
              });
              console.log('password changed.');
            });
          }
        });
      }
    });
  });

  // delete user
  app.delete('/user/:id', tokenCheck, (req, res) => {
    User.findByIdAndRemove(req.params.id,
      (err, user) => {
        if (err) {
          console.log(err);
          return res.json({ error: err });
        };
        res.json({
          message: 'user deleted'
        });
      });
  });
};

// userSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   bcrypt.hash(user.password, 10, function(err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

// userSchema.methods.comparePw = function(pw, next) {
//   bcrypt.compare(pw, this.password, (err, isMatch) => {
//     if (err) {
//       return next(err, false);
//     }
//     return next(null, isMatch);
//   });
// };
