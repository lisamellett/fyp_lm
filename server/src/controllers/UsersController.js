const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/config');


module.exports = {
  async users(req, res) {
    try {
      const docs = await User.find();
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
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the users',
      });
    }
  },

  async managers(req, res) {
    try {
      const docs = await User.find( { role: "manager" } );
      const response = {
        count: docs.length,
        managers: docs.map(doc => {
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
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the users',
      });
    }
  },


  update(req, res, next) {
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
    },


  getOneUser(req, res, next) {
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
  },


  deleteOneUser(req, res, next) {
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
  },


};