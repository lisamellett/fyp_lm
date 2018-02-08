// put all the requests involving user models in here

const mongoose = require('mongoose');
// may need to import express

const User = require('../../models/User');

module.exports = (app) => {

  //getting all users
  app.get('/users', (req, res, next) => {
    User.find()
      .exec()
      .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  });


  // adding a user
  app.post('/users/register', (req, res) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      role: req.body.role,
      manager: new mongoose.Types.ObjectId(), // possibly just change this to team
      team: req.body.team,
      allowance: req.body.allowance,
      taken: req.body.taken,
      dates: req.body.dates,
      job: req.body.job,
      username: req.body.username,
      password: req.body.password,
    });

    user
      .save()
      .then(result => { // mongoose model method to store in database
        // have to call exec or then or callback after save
        console.log(result);
        res.status(201).json({
          message: 'Handling POST requests to /register',
          createdUser: user,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
        })
      }); // catch potential errors

    res.send({
      message: `Hell ${req.body.gender}! You were registered!`, // server will send back a json object which has the attribut
      // message and then the string hello when it gets a request to
      // the /status endpoint
    });
  }); // post request to register endpoint


  // getting a single user
  app.get('/users/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
      .exec()
      .then(doc => {
        console.log('From database', doc); // we have to call
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({message: 'No valid entry found for provided id'})
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
    // cant send the result here because async
    // so this code would run before getting response
  });


  // Update a User
  // patch is keeping the existing object (dont change the id)
  // put updates the field values
  // cant add new properties this way
  app.patch('/users/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, {$set: updateOps})// might just change one thing :)
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    // User.update({_id: id}, {
    //   $set: {
    //     name: req.body.newName,
    //     dob: req.body.newDob,
    //     gender: req.body.newGender,
    //     role: req.body.newRole, // NB promotion
    //     manager: req.body.newManagerId, // changed teams
    //     team: req.body.newTeam,
    //     allowance: req.body.newAllowance,
    //     taken: req.body.newTaken,
    //     dates: req.body.newDates, // will need to find a way to add new dates easily
    //     job: req.body.newJob,
    //     username: req.body.newUsername,
    //     password: req.body.newPassword,
    //
    //   }
    // })
  });


  // Delete a user
  app.delete('/users/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id}) // remove the user who has an _id value of id
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};