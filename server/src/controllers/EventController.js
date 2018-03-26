const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');


module.exports = {
  async events(req, res) {
    try {
      const docs = await Event.find();
      const response = {
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            employeeId: doc.employeeId,
            managerId: doc.managerId,
            title: doc.title,
            start: doc.start,
            end: doc.end,
            cssClass: doc.cssClass,
            type: doc.type, // Request or Booked
            reason: doc.reason, // this could be appointment, holidays -> may only show in your personal cal
            request: {
              type: 'GET',
              url: 'http://localhost:8081/events/' + doc.userId, // this is just to show we can format reponse whatever way we want
            }
          }
        }),
      };
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the events',
      });
    }
  },

  async getOneUserEvents(req, res) {
    try {
      const docs = await Event.find( { employeeId: req.params.userId} );
      const response = {
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            employeeId: doc.userId,
            managerId: doc.managerId,
            title: doc.title,
            start: doc.start,
            end: doc.end,
            cssClass: doc.cssClass,
            type: doc.type, // Request or Booked
            reason: doc.reason, // t
          }
        }),
      };
      res.status(200).json(response);
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the events for this employee',
      });
    }
  },

  addEvent(req, res) {
    User.findById(req.body.employeeId) // this is to make sure the user exists
      .then(employeeId => {
        if (!employeeId) {
          return res.status(404).json({
            message: "user not found",
          });
        }
        const event = new Event({
          _id: new mongoose.Types.ObjectId(),
          employeeId: req.body.employeeId,
          managerId: req.body.managerId,
          title: req.body.title,
          start: req.body.start,
          end: req.body.end,
          cssClass: req.body.cssClass,
          type: req.body.type, // Request or Booked
          reason: req.body.reason,
        });
        return event.save();
      })
      .then(result => { // mongoose model method to store in database
        // have to call exec or then or callback after save
        console.log(result);
        res.status(201).json({
          message: 'Created new event',
          createdEvent: {
            _id: result._id,
            employeeId: result.employeeId,
            managerId: result.managerId,
            title: result.title,
            start: result.start,
            end: result.end,
            cssClass: result.cssClass,
            type: result.type, // Request or Booked
            reason: result.reason,
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          error: 'Unable to create event',
        })
      });
  },

  deleteEvent(req, res, next) {
    const id = req.params.eventId;
    Event.remove({_id: id}) // remove the user who has an _id value of id
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'event deleted',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  updateToBooked(req, res, next) {
    const id = req.params.eventId;
    const updateOps = {type: "booked"}; // may have to change title too and CSS class etc
    Event.update({_id: id}, {$set: updateOps})// might just change one thing :)
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Event Updated',
          request: {
            type: 'GET',
            url: 'http://localhost:8081/events/',
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },

  async getTeamEvents(req, res) {
    try {
      const docs = await Event.find( { managerId: req.params.managerId} ); //Todo: change this back
      const response = {
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            employeeId: doc.userId,
            managerId: doc.managerId,
            title: doc.title,
            start: doc.start,
            end: doc.end,
            cssClass: doc.cssClass,
            type: doc.type, // Request or Booked
            reason: doc.reason, // t
          }
        }),
      };
      res.status(200).json(response);
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the events for this team',
      });
    }
  },
};
