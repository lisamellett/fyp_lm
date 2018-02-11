// put all the requests involving user models in here
const AuthenticationController = require('../../controllers/AuthenticationController');

const AuthenticationControllerPolicy = require('../../policies/AuthenticationContollerPolicy');

const mongoose = require('mongoose');
// may need to import express

const User = require('../../models/User');

module.exports = (app) => {

  //getting all users
  app.get('/users', (req, res, next) => {
    User.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              _id: doc._id,
              name: doc.name,
              dob: doc.dob,
              gender: doc.gender,
              role: doc.role,
              manager: doc.manager, // possibly just change this to team
              team: doc.team,
              allowance: doc.allowance,
              taken: doc.taken,
              dates: doc.dates,
              job: doc.job,
              username: doc.username,
              password: doc.password,
              request: {
                type: 'GET',
                url: 'http://localhost:8081/users/' + doc._id, // this is just to show we can format reponse whatever way we want
              }
            }
          }),
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  });


  // adding a user
  // possibly change this to a different file, authentiacation
  app.post('/users/register',
    AuthenticationControllerPolicy.register, // we call this middleware before we hit our controller
    // when next() is called in policy then it will go  the controller
    AuthenticationController.register);

  // getting a single user
  app.get('/users/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
      .exec()
      .then(doc => {
        console.log('From database', doc); // we have to call
        if (doc) {
          res.status(200).json({
            user: doc,
            request: {
              type: 'GET',
              description: 'Get all users',
              url: 'http://localhost:8081/users',
            }
          });
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
        res.status(200).json({
          message: 'User Updated',
          request: {
            type: 'GET',
            url: 'http://localhost:8081/users/' + result._id,
          }
        });
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
        res.status(200).json({
          message: 'user deleted',
          });
        })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};