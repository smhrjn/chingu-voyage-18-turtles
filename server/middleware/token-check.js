const pass = require('../../config/config.js');
const jwt = require('jsonwebtoken');
// const User = require('../models/user');

module.exports = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks if the issuer is the one who is using the token
    jwt.verify(token, pass.secret, {
      issuer: req.params.id
    }, (err, decoded) => {
      if (err) {
        return res.json(err);
      } else {
        // if everything is good, save to request to use in next callback
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token return an error
    return res.status(403).send({
      error: 'You are not logged in.'
    });
  }
};
