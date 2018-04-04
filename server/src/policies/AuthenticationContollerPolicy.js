const Joi = require('joi');

module.exports = {
  register (req, res, next) { //req is the thing that comes in, res is what you send back
    // next is what you use to invoke the next thing in the routes path
    // inside here we want to validate that inputs pass certain constraints
    const schema = {
      name: Joi.string(),
      dob: Joi.date().iso(),
      gender: Joi.string(),
      role: Joi.string(),
      manager: Joi.string(), // possibly just change this to team
      team: Joi.string(),
      allowance: Joi.number(),
      taken: Joi.number(),
      dates: Joi.array(), // Joi.array().items(Joi.string(), Joi.any().strip());
      title: Joi.string(),
      reviews: Joi.array(),
      email: Joi.string(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
      address: Joi.string(),
      phone: Joi.string(),
      kinName: Joi.string(),
      kinNum: Joi.string(),
    };

    const {error, value} = Joi.validate(req.body, schema);

    if (error) {
      switch(error.details[0].context.key) {
        case 'name':
          res.status(400).send({
            error: 'Name must be a string'
          });
          break;

        case 'dob':
          res.status(400).send({
            error: 'dob must be a date'
          });
          break;

        case 'gender':
          res.status(400).send({
            error: 'Gender must be a string'
          });
          break;

        case 'role':
          res.status(400).send({
            error: 'Role must be a string'
          });
          break;

        case 'team':
          res.status(400).send({
            error: 'Team must be a string'
          });
          break;

        case 'manager':
          res.status(400).send({
            error: 'something is wrong with manager field'
          });
          break;

        case 'allowance':
          res.status(400).send({
            error: 'Allowance must be a number'
          });
          break;

        case 'taken':
          res.status(400).send({
            error: 'Taken must be a number'
          });
          break;

        case 'address':
          res.status(400).send({
            error: 'Address must be a string'
          });
          break;

        case 'phone':
          res.status(400).send({
            error: 'Phone must be a string'
          });
          break;

        case 'kinName':
          res.status(400).send({
            error: 'Name of kin must be a string'
          });
          break;

        case 'kinNum':
          res.status(400).send({
            error: 'Kin number must be a string'
          });
          break;

        case 'title':
          res.status(400).send({
            error: 'Title must be a string'
          });
          break;

        case 'reviews':
          res.status(400).send({
            error: 'Something is wrong with reviews'
          });
          break;

        case 'email':
          res.status(400).send({
            error: 'Invalid email address'
          });
          break;

        case 'username':
          res.status(400).send({
            error: 'Username must be min 3, max 30 and alphanumeric'
          });
          break;

        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br> 1. It must contain ONLY the following characters: lower case, upper case and numbers
              <br> 2. It must be at least 8 characters in length and not greater than 32 characters`
          });
          break;
        default:
          res.status(400).send({
            error: 'invalid registration information'
          });
      }
    } else {
      next()
    }
  }
};