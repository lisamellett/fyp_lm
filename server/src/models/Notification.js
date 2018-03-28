const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  type: {type: String, required: true},
  message: {type: String, required: true},
  data: {},
});

module.exports = mongoose.model('Notification', NotificationSchema);