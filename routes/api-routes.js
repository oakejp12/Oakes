import request from '../src/github_data';

module.exports = function(app) {

  app.get("/repos", (req, res) => {
    console.log("Hitting the repo path...");
    request.grabRepoCount({
    }, (err, response) => {
        if (err) throw new Error("Error hitting Github API: " + err);

        console.log("Github response length: " + response.length);

        res.json(response);
    });
  });

  app.get("/commits", (req, res) => {
    console.log("Hitting the commit path...");
    request.grabCommitCount({}, (err, response) => {
      if (err) throw new Error("Error hitting Github API at " + req.path);  
      console.dir(response);
      // res.json(response);
    })
  });

  /**
   * Get all followers
   */
  app.get("/followers", (req, res) => {
    console.log("Hitting the followers path");
    request.grabFollowers({}, (err, response) => {
      if (err) throw new Error("Error hitting Github API at " + req.path);
      res.json(response);
    });
  });

};  