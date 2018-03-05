const AuthenticationController = require('../../controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('../../policies/AuthenticationContollerPolicy');

const mongoose = require('mongoose');
// may need to import express

const UsersController = require('../../controllers/UsersController');

const User = require('../../models/User');

module.exports = (app) => {

  app.get('/users', UsersController.users);

  app.post('/users/register',
    AuthenticationControllerPolicy.register, // we call this middleware before we hit our controller
    // when next() is called in policy then it will go  the controller
    AuthenticationController.register);

  app.post('/users/login', AuthenticationController.login);

  app.get('/users/:userId', UsersController.getOneUser);

  app.patch('/users/:userId', UsersController.update);

  app.delete('/users/:userId', UsersController.deleteOneUser);

  app.get('/managers', UsersController.managers);

};