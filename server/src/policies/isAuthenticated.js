// we are going to use this policy isAuthenticated and put it
// in front of our routes, and this is going to call passport.authenticate
// with the jwt strategy which will make sure it will call watever
// strategy we put in passport.js
const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      res.status(403).send({
        error: "You do not have access to this resource",
      });
    } else {
      // then there is a user and they are logged in
      req.user = user;
      next()
    }
  })(req, res, next)
};