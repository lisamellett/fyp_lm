const Notification = require('../models/Notification');
const User = require('../models/User');
const mongoose = require('mongoose');


module.exports = {
  async notifications(req, res) {
    try {
      const docs = await Notification.find();
      const response = {
        count: docs.length,
        notifications: docs.map(doc => {
          return {
            _id: doc._id,
            senderId: doc.senderId,
            receiverId: doc.receiverId,
            type: doc.type,
            message: doc.message,
            request: {
              type: 'GET',
              url: 'http://localhost:8081/notifications/' + doc.senderId, // this is just to show we can format reponse whatever way we want
            }
          }
        }),
      };
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the notifications',
      });
    }
  },

  async getOneUserNotifications(req, res) {
    try {
      const docs = await Notification.find( { receiverId: req.params.userId} );
      const response = {
        count: docs.length,
        notifications: docs.map(doc => {
          return {
            _id: doc._id,
            senderId: doc.senderId,
            receiverId: doc.receiverId,
            type: doc.type,
            message: doc.message,
          }
        }),
      };
      res.status(200).json(response);
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the notifications for this employee',
      });
    }
  },

  addNotification(req, res) {
    User.findById(req.body.receiverId) // this is to make sure the receiver exists
      .then(receiverId => {
        if (!receiverId) {
          return res.status(404).json({
            message: "Receiver user not found",
          });
        }
        const notification = new Notification({
          _id: new mongoose.Types.ObjectId(),
          senderId: req.body.senderId,
          receiverId: req.body.receiverId,
          type: req.body.type,
          message: req.body.message,
        });
        return notification.save();
      })
      .then(result => { // mongoose model method to store in database
        // have to call exec or then or callback after save
        console.log(result);
        res.status(201).json({
          message: 'Created new notification',
          createdNotification: {
            _id: result._id,
            senderId: result.senderId,
            receiverId: result.receiverId,
            type: result.type,
            message: result.message,
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          error: 'Unable to create notification',
        })
      });
  },

  deleteNotification(req, res, next) {
    const id = req.params.notificationId;
    Notification.remove({_id: id}) // remove the user who has an _id value of id
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'notification deleted',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
};

