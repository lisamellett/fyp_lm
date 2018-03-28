const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  employeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  managerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  start: {type: String, required: true},
  end: {type: String},
  cssClass: {type: Array, required: true},
  type: {type: String, required: true}, // Request or Booked
  reason: {type: String}, // this could be appointment, holidays -> may only show in your personal cal
  dates: {type: Array},
  icon: {type: String},
  name: {type: String},
});

module.exports = mongoose.model('Event', EventSchema);