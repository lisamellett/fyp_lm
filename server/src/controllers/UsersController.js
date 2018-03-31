const User = require('../models/User');
const mongoose = require('mongoose');
const config = require('../config/config');
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
  async users(req, res) {
    try {
      const docs = await User.find();
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            dob: doc.dob,
            gender: doc.gender,
            role: doc.role,
            manager: doc.manager, // possibly just change this to team
            team: doc.team,
            allowance: doc.allowance,
            taken: doc.taken,
            dates: doc.dates,
            title: doc.title,
            reviews: doc.reviews,
            email: doc.email,
            username: doc.username,
            password: doc.password,
            request: {
              type: 'GET',
              url: 'http://localhost:8081/users/' + doc._id, // this is just to show we can format reponse whatever way we want
            }
          }
        }),
      };
      res.status(200).json(response);
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the users',
      });
    }
  },

  async managers(req, res) {
    try {
      const docs1 = await User.find( { role: "manager" } );
      const docs2 = await User.find( { role: "senior manager" } );
      const docs = docs1.concat(docs2);
      const response = {
        count: docs.length,
        managers: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            dob: doc.dob,
            gender: doc.gender,
            role: doc.role,
            manager: doc.manager, // possibly just change this to team
            team: doc.team,
            allowance: doc.allowance,
            taken: doc.taken,
            dates: doc.dates,
            title: doc.title,
            reviews: doc.reviews,
            username: doc.username,
            password: doc.password,
            request: {
              type: 'GET',
              url: 'http://localhost:8081/users/' + doc._id, // this is just to show we can format reponse whatever way we want
            }
          }
        }),
      };
      res.status(200).json(response);
    } catch (err){
      res.status(500).send({
        error: 'An error has occurred trying to fetch the managers',
      });
    }
  },


  update(req, res, next) {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, {$set: updateOps})// might just change one thing :)
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User Updated',
          request: {
            type: 'GET',
            url: 'http://localhost:8081/users/' + result._id,
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    },

  async addReview(req, res) {
    try {
      const employeeId = req.params.userId;
      console.log(employeeId);

      const review = {
        "authorId": req.body.authorId,
        "fields": req.body.fields,
        "feedback": req.body.feedback,
        "date": new Date().toDateString(),
      };

      const email = req.body.email;
      console.log(email);

      const output = `
        <p>You have a new performance review</p>
        <h3>Date: ${review.date}</h3>
        <ul>  
          <li>Feedback: ${review.feedback}</li>
        </ul>
        <p>A new review has been submitted for you. To view the full review please log into your account</p>
       `;

      let mailOptions = {
        from: '"Kin" <elizamillitt@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Performance Review', // Subject line
        // text: 'Hello world?', // plain text body
        html: output // html body
      };

      console.log(review);
      const user = await User.findOne({_id: employeeId});
      if (!user) {
        return res.status(403).send({
          error: 'The user you are trying to post a review for does not exist'
        });
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been sent'});
      });

      const response = await User.findOneAndUpdate({_id: employeeId}, {$push: {reviews: { $each: [review], $position: 0}}});
      res.status(200).json(response);

    } catch (err){
      res.status(500).send({
        error: err,
      });
    }
  },

  async getManagersEmployees(req, res) {
    // check that it is a manager id
    const managerId = req.params.managerId;
    try {
      const manager = await User.findOne({_id: managerId, role: "manager"});
      if (!manager) {
        const seniorManager = await User.findOne({_id: managerId, role: "senior manager"});
        if (!seniorManager) {
          return res.status(403).send({
            error: 'This user is not a manager or senior manager, or else does not exist'
          });
        }
      }
      const employees = await User.find( { manager: managerId } );
      const response = {
        count: employees.length,
        employees: employees.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            dob: doc.dob,
            gender: doc.gender,
            role: doc.role,
            manager: doc.manager, // possibly just change this to team
            team: doc.team,
            allowance: doc.allowance,
            taken: doc.taken,
            dates: doc.dates,
            title: doc.title,
            reviews: doc.reviews,
            email: doc.email,
            username: doc.username,
            password: doc.password,
            request: {
              type: 'GET',
              url: 'http://localhost:8081/users/' + doc._id, // this is just to show we can format reponse whatever way we want
            }
          }
        }),
      };
      res.status(200).json(response);
    } catch(err) {
      res.status(500).send({
        error: err
      })
    }
  },


  getOneUser(req, res, next) {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      console.log('From database', doc); // we have to call
      if (doc) {
        res.status(200).json({
          user: doc,
          request: {
            type: 'GET',
            description: 'Get all users',
            url: 'http://localhost:8081/users',
          }
        });
      } else {
        res.status(404).json({message: 'No valid entry found for provided id'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  },


  deleteOneUser(req, res, next) {
  const id = req.params.userId;
  User.remove({_id: id}) // remove the user who has an _id value of id
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'user deleted',
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