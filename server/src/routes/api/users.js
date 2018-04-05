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
    // isAuthenticated,
    // AuthenticationController.roleAuthorization(['admin']),
    // add above two lines back in when finished testing
    UsersController.users);

  app.post('/users/register',
    // to register a user someone has to be logged in
    //isAuthenticated,
    //AuthenticationController.roleAuthorization(['admin']), // only admins can register
    //AuthenticationControllerPolicy.register, // we call this middleware before we hit our controller
    // when next() is called in policy then it will go  the controller
    AuthenticationController.register);

  app.post('/users/login',
    AuthenticationController.login,
    AuthenticationController.roleAuthorization(['employee', 'manager', 'admin', 'senior manager'])); // this adds extra security -> talk about in report

  app.get('/users/:userId',
    isAuthenticated,
    UsersController.getOneUser); // not sure if the end point is being used yet

  app.patch('/users/:userId',
    // to update users the user has to be logged in
    isAuthenticated,
    AuthenticationController.roleAuthorization(['admin', 'manager', 'senior manager']),
    UsersController.update);

  app.delete('/users/:userId',
    isAuthenticated,
    AuthenticationController.roleAuthorization(['admin']),
    UsersController.deleteOneUser);

  app.get('/managers',
    // isAuthenticated,
    // AuthenticationController.roleAuthorization(['admin']),
    UsersController.managers);

  app.post('/reviews/:userId',
    UsersController.addReview);

  app.get('/employees/:managerId',
    UsersController.getManagersEmployees);
};