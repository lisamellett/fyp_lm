const User = require('../models/User');
const mongoose = require('mongoose');

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
        res.status(500).json({
          error: 'Username already exists',
        })
      }); // catch potential errors

    // res.send({
    //   message: `Hello ${req.body.name}! You were registered!`, // server will send back a json object which has the attribut
    //   // message and then the string hello when it gets a request to
    //   // the /status endpoint
    // });
  },// post request to register endpoint
};