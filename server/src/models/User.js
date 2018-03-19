const Promise = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  dob: {type: Date, required: true},
  gender: {type: String, required: true},
  role: {type: String, required: true},
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},// possibly just change this to team
  team: {type: String, required: true},
  allowance: {type: Number, required: true},
  taken: {type: Number, required: true},
  dates: {type: Array, required: true},
  title: {type: String, required: true},
  email: {type: String, required: true},
  reviews: [
    {
      authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // manager id
      fields: {type: Object},
      feedback : {type: String},
      date: {type: String},
    }
  ],
  prettyDob: {type: String}, // todo: do I  need this?
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  // may include a list of message Ids here too
  // include a message schema and then when user is logged in
  // get all messages with that user id associated with them
  // maybe dont have to make a message schema though?
  // could just embed them like messages: [{}, {}, {}]
  // but then what about deleting, marking as unread/read
  // may also have to make a dates model, unless figure out a way
  // to remove dates etc
  // https://github.com/academind/node-restful-api-tutorial/blob/07-orders-and-mongodb/api/routes/orders.js
  // this should be handy for message relationship
  // I think we will have to create messsage schema.
  // will have a from: userid, to: useris
});

UserSchema.pre('save', function() { // do i need to include update abd before here too?
  const user = this;

  const SALT_FACTOR = 8;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash;
    })

  // may need to include next here

});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);