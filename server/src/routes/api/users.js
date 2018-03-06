const AuthenticationController = require('../../controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('../../policies/AuthenticationContollerPolicy');
const isAuthenticated = require('../../policies/isAuthenticated');
// include isAuthenticated policy before any endpoint where the user should
// be logged in to access

const mongoose = require('mongoose');
// may need to import express

const UsersController = require('../../controllers/UsersController');


module.exports = (app) => {

  app.get('/users',
    isAuthenticated,
    UsersController.users);

  app.post('/users/register',
    // to register a user someone has to be logged in
    isAuthenticated,
    AuthenticationControllerPolicy.register, // we call this middleware before we hit our controller
    // when next() is called in policy then it will go  the controller
    AuthenticationController.register);

  app.post('/users/login',
    AuthenticationController.login);

  app.get('/users/:userId',
    isAuthenticated,
    UsersController.getOneUser);

  app.patch('/users/:userId',
    // to update users the user has to be logged in
    isAuthenticated,
    UsersController.update);

  app.delete('/users/:userId',
    isAuthenticated,
    UsersController.deleteOneUser);

  app.get('/managers',
    isAuthenticated,
    UsersController.managers);

};