// Import dependencies
const express = require('express');
const jwt = require('jsonwebtoken');

const withAuth = require('../middleware/withAuth');
const router = express.Router();

// const UserController = require('../../controllers/users.js');
const User = require('../db/models/User')

router.get('/', withAuth, (req, res) => {
  User.model.find({}).populate('company')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send(err));
});

router.get('/:id', withAuth, (req, res) => {
  User.model.findById(req.params.id).populate('company')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err));
});

router.post('/', (req, res) => {
  let user = User.populate(req.body);
  user.save()
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(500).json(err));
});

router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  User.model.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect username or password'
        });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500).json(err);
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect username or password'
            });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).status(200).json(user);
        }
      });
    }
  });
});

module.exports = router;
