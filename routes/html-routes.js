/**
 * This file offers a set of routes for sending 
 * users to the various HTML landing pages
 */
const path = require('path');
const request = require('../src/github_data');

module.exports = function(app) {

  app.get("/", (req, res) => {
    console.log("Hitting the index path...");

    request.grabWatchedRepos({
    }, (err, res) => {
        if (err) throw new Error("Error hitting Github API", err);

        console.log("Github response length: " + res.length);
    });
    
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.get("/blog", (req, res) => {
      console.log("Hitting the blog path.");
      res.json({
          "message": "Wait! Coming soon!"
      });
      res.end();
  });

};