module.exports = {
  db: 'mongodb://lisamellett:mellis2313@ds135179.mlab.com:35179/kinhr',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
    // this secret is a string only known by the server and is used
    // to check if the jwtoken is valid or not
  }
};
