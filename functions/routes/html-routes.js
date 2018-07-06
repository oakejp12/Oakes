/**
 * This file offers a set of routes for sending 
 * users to the various HTML landing pages
 */
const path = require('path');

module.exports = function(app) {

  app.get("/", (req, res) => {
    console.log("Hitting the home page.");
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.sendFile(path.join(__dirname, "..", "public", "profile.html"));
  });

  app.get("/blog", (req, res) => {
      console.log("Hitting the blog path.");
      res.end(
          "Wait! Site is under construction. Coming soon!"
      );
      res.end();
  });

  app.get('*', (req, res) => {
    console.log("YOU DUMMY! GO TO A LIVING PAGE!");
    res.sendFile(path.join(__dirname, "..", "public", "404.html"));
  }) 
};