const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  dob: Date,
  gender: String,
  role: String,
  manager: mongoose.Schema.Types.ObjectId, // possibly just change this to team
  team: String,
  allowance: Number,
  taken: Number,
  dates: Array,
  job: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);