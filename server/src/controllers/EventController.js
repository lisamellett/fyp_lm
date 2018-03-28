const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // todo: may need to change this to own host when deploy
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'elizamillitt@gmail.com', // generated ethereal user
    pass: 'lizmar23'  // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});


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
            icon: doc.icon,
            cssClass: doc.cssClass,
            name: doc.name,
            type: doc.type, // Request or Booked
            dates: doc.dates,
            manager: doc.manager,
            email: doc.email,
            warning: doc.warning,
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
            icon: doc.icon,
            email: doc.email,
            employeeId: doc.employeeId,
            managerId: doc.managerId,
            title: doc.title,
            start: doc.start,
            end: doc.end,
            name: doc.name,
            cssClass: doc.cssClass,
            type: doc.type, // Request or Booked
            reason: doc.reason, // t
            dates: doc.dates,
            manager: doc.manager,
            warning: doc.warning,
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
        ///////////////////////////// sending an email
        const email = req.body.manager.email;
        console.log(email);

        const output = `
        <p>Time Off request</p>
        <h3>New Time Off Request had been made!</h3>
        <ul>  
          <li>Please log into Kin to see the new changes, these changes need to be approved or disapproved</li>
        </ul>
        <p>Kin Ltd.</p>
       `;

        let mailOptions = {
          from: '"HR APP" <elizamillitt@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Time Off Request', // Subject line
          // text: 'Hello world?', // plain text body
          html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.render('contact', {msg:'Email has been sent'});
        });
        /////////////////////////////

        const event = new Event({
          _id: new mongoose.Types.ObjectId(),
          employeeId: req.body.employeeId,
          managerId: req.body.managerId,
          title: req.body.title,
          start: req.body.start,
          icon: req.body.icon,
          end: req.body.end,
          cssClass: req.body.cssClass,
          name: req.body.name,
          type: req.body.type, // Request or Booked
          reason: req.body.reason,
          dates: req.body.dates,
          manager: req.body.manager,
          email: req.body.email,
          warning: req.body.warning,
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
            icon: result.icon,
            end: result.end,
            name: result.name,
            cssClass: result.cssClass,
            type: result.type, // Request or Booked
            reason: result.reason,
            dates: result.dates,
            manager: result.manager,
            email: result.email,
            warning: result.warning,
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
        ///////////////////////////// sending an email
        const email = req.body.email;
        console.log(email);

        console.log('here');

        const output = `
        <p>Time Off Disapproved :( </p>
        <h3>Time Logs</h3>
        <ul>  
          <li>Please log into Kin to see your updated request </li>
        </ul>
        <p>Kin Ltd</p>
       `;

        let mailOptions = {
          from: '"HR APP" <elizamillitt@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Time Off Disapproved',
          html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.render('contact', {msg:'Email has been sent'});
        });
        /////////////////////////////

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  updateToBooked(req, res, next) {
    console.log('in here now');
    const id = req.params.eventId;
    console.log('here', req.body.cssClass);
    console.log(req.body.type);
    const updateOps = {type: req.body.type, cssClass:req.body.cssClass}; // may have to change title too and CSS class etc, add in chnage of color here too
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

        ///////////////////////////// sending an email
        const email = req.body.email;

        const output = `
        <p>Time Off approved</p>
        <h3>Yay you time off has been approved!!</h3>
        <ul>  
          <li>Log into Kin to see the changes. </li>
        </ul>
        <p>Kin Ltd.</p>
       `;

        let mailOptions = {
          from: '"Kin" <elizamillitt@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Time Off Approved', // Subject line
          // text: 'Hello world?', // plain text body
          html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.render('contact', {msg:'Email has been sent'});
        });
        /////////////////////////////

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },

  async getTeamEvents(req, res) {
    try {
      const docs = await Event.find( { managerId: req.params.managerId, type: "approved"} ); //Todo: change this back to wer request type is booked/approved
      const response = {
        count: docs.length,
        events: docs.map(doc => {
          return {
            _id: doc._id,
            employeeId: doc.userId,
            managerId: doc.managerId,
            icon: doc.icon,
            title: doc.title,
            start: doc.start,
            end: doc.end,
            name: doc.name,
            cssClass: doc.cssClass,
            type: doc.type, // Request or Booked
            reason: doc.reason, // t
            dates: doc.dates,
            manager: doc.manager,
            email: doc.email,
            warning: doc.warning,
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
