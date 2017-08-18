import request from '../src/github_data';

module.exports = function(app) {

  app.get("/repos", (req, res) => {
    console.log("Hitting the repo path...");
    request.grabRepoCount({
    }, (err, response) => {
      if (err) throw new Error("Error hitting Github API: " + err);
      res.json(response);
    });
  });

  app.get("/commits", (req, res) => {
    console.log("Hitting the commit path...");
    request.grabCommitCount({
    }, (err, response) => {
      if (err) throw new Error("Error hitting Github API:" + err);
      res.json(response);
    });
  });

  app.get("/followers", (req, res) => {
    console.log("Hitting the followers path");
    request.grabFollowers({}, (err, response) => {
      if (err) throw new Error("Error hitting Github API at " + req.path);
      res.json(response);
    });
  });

};  