const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

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
  job: {type: String, required: true},
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

// UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);