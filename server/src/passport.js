/* eslint-disable */
const passport = require('passport');
const User = require('./models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; // helper function
const config = require('./config/config');

passport.use(
  // pass it the strategy we want passport to use
  // this strategy is basically going to verify that the token that
  // comes in on the AuthHeader is valid
  new JwtStrategy({
    // if someone makes request with bearer token in Auth header then use that
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // next we need to pass it a secret key
    // we already had this key defined as we used for making the jwt token
    secretOrKey: config.authentication.jwtSecret,
  },
  async (jwtPayload, done) => {
    try {
      // when we get a request, we need to first check that the user exists in the database
      // jwtPayload will be whatever we decide to encrypt or sign
      // look AuthenticationController, we signed the user
      const user = await User.findOne({ _id: jwtPayload._id });
      // if that user doesn't exist then return error
      if (!user) {
        return done(new Error(), false);
      }
      // otherwise return user object
      return done(null, user);
      // whatever you pass as second parameter will set it on the req
      // eg. above.. req.user = user
    } catch (err) {
      return done(new Error(), false);
    }
  }),
);

module.exports = null; // just to show that this file does nothing but set up passport
