/**
 * This file offers a set of routes for sending 
 * users to the various HTML landing pages
 */

const path = require('path');

module.exports = function(app) {

  app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
  });

};