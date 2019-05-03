const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  // third party encryption
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid authentication credentials!'
          });
        });
    });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    fetchedUser = user;
    if (!fetchedUser) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      process.env.JWT_KEY, // access the global variable we stored in "nodemon.json"
      { expiresIn: '1h' }
    );
    // res will be returned automatically because we have no more codes afterward
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(error => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  });
}