module.exports = {
  db: 'mongodb://localhost:27017/fyp',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
    // this secret is a string only known by the server and is used
    // to check if the jwtoken is valid or not
  }
};
