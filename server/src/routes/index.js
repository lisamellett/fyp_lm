const fs = require('fs'); // filesystem
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    console.log(file);
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};

// the names of the files in the routes/api folder must match the endpoint name