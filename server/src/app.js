const express = require('express');
const bodyParser = require('body-parser'); // allows you to process json data easily
const cors = require('cors'); // this will go into the modules folder and find the main file and assign it to a variable
const morgan = require('morgan'); // log generator
const mongoose = require('mongoose');

// what is a cors error - google images
// cross origin resource sharing
// security concept - https://youtu.be/zoSJ3bNGPp0

const config = require('./config/config');

const port = process.env.PORT || 8081;

// const userRoutes = require('routes/api/users');

// Connect to mongoose
mongoose.connect(config.db); // this will need to be changed when switching to atlas
mongoose.Promise = global.Promise;

const database = mongoose.connection;
database.once('open', () => {
  console.log('Connected to MongoDb');
});

const app = express(); // this will build us a simple express server
app.use(morgan('combined')); // combine allows us to print out our logs in a certain way
app.use(bodyParser.json()); // allows our app to easily parse any json data that is sent in
app.use(cors()); // you need cors if you want your server to be served on a
// different domain and you want any client to be able to hit your server

require('./routes/index')(app); // pass routes app which will attach all the endpoints

// app.listen(process.env.PORT || 8081);
// we have a server running on port 8081, process.env.PORT allows us to
// overwrite that port using environment variables if we want

// app.use("/users", userRoutes);

app.listen(port, '0.0.0.0', (err) => { // must take app that was defined above and have it listen on port
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});
