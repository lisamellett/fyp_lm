const express = require('express');
const bodyParser = require('body-parser'); // allows you to process json data easily
const cors = require('cors'); // this will go into the modules folder and find the main file and assign it to a variable
const morgan = require('morgan'); // log generator

const app = express(); // this will build us a simple express server
app.use(morgan('combined')); // combine allows us to print out our logs in a certain way
app.use(bodyParser.json()); // allows our app to easily parse any json data that is sent in
app.use(cors()); // you need cors if you want your server to be served on a
// different domain and you want any client to be able to hit your server

app.post('/register', (req, res) => {
  res.send({
    message: `hello ${req.body.email}! Your user was registered!`, // server will send back a json object which has the attribut
    // message and then the string hello when it gets a request to
    // the /status endpoint
  });
}); // get request to a status endpoint and
// once we get a request on that endpoint we can send something back

app.listen(process.env.PORT || 8081);
// we have a server running on port 8081, process.env.PORT allows us to
// overwrite that port using environment variables if we want

