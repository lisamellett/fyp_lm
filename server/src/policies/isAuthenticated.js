// we are going to use this policy isAuthenticated and put it
// in front of our routes, and this is going to call passport.authenticate
// with the jwt strategy which will make sure it will call watever
// strategy we put in passport.js
const passport = require('passport');

// had to write this custom logic because passport default sends
// back html error but we want json for out pure restful api
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    console.log('rifht here');
    if (err || !user) {
      console.log('1111');
      res.status(403).send({
        error: "You do not have access to this resource",
      });
    } else {
      console.log('22222');
      // then there is a user and they are logged in
      req.user = user;
      next()
    }
  })(req, res, next)
};