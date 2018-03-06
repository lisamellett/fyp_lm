const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// function to sign a user object to using jwt library to give us a jwt token
function jwtSignUser (user) {
  const ONE_WEEK =  60 * 60 * 24 *7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  })
}

module.exports = {
  register (req, res) {
    User.findById(req.body.manager) // this is to make sure the manager exists
      .then(manager => {
        if (!manager) {
          console.log('hahjsdh');
          return res.status(404).json({
            message: "Manager not found",
          });
        }
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          dob: req.body.dob,
          gender: req.body.gender,
          role: req.body.role,
          manager: req.body.manager, // possibly just change this to team
          team: req.body.team,
          allowance: req.body.allowance,
          taken: req.body.taken,
          dates: req.body.dates,
          job: req.body.job,
          username: req.body.username,
          password: req.body.password,
        });
        return user.save();
      })
      .then(result => { // mongoose model method to store in database
        // have to call exec or then or callback after save
        console.log(result);
        console.log('aaaaaa');
        res.status(201).json({
          message: 'Created new user',
          createdUser: {
            _id: result._id,
            name: result.name,
            dob: result.dob,
            gender: result.gender,
            role: result.role,
            manager: result.manager, // possibly just change this to team
            team: result.team,
            allowance: result.allowance,
            taken: result.taken,
            dates: result.dates,
            job: result.job,
            username: result.username,
            password: result.password,
            request: {
              type: 'GET',
              url: 'http://localhost:8081/users/' + result.id,
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        console.log('un here');
        res.status(400).json({
          error: 'Username already exists or invalid manager id',
        })
      });


  },// post request to login endpoint
  async login (req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username: username});
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect pwd'
        })
      }

      console.log('pwd valid', isPasswordValid);

      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });

      console.log('pwd valid', isPasswordValid);

    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to log in',
      });
    }
  }
};