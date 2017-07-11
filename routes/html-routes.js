/**
 * This file offers a set of routes for sending 
 * users to the various HTML landing pages
 */
import path from 'path';

module.exports = function(app) {

  app.get("/", (req, res) => {
    console.log("Hitting the index path...");
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.get("/blog", (req, res) => {
      console.log("Hitting the blog path.");
      res.end(
          "Wait! Site is under construction. Coming soon!"
      );
      res.end();
  });
};