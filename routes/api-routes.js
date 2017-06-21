const request = require('../src/github_data');

module.exports = function(app) {

  app.get("/repos", (req, res) => {
    console.log("Hitting the repo path...");

    var data;

    request.grabRepoCount({
    }, (err, response) => {
        if (err) throw new Error("Error hitting Github API", err);

        console.log("Github response length: " + response.length);

        res.json(response);
    });
  });


  app.get("/watch", (req, res) => {
    console.log("Hitting the watch path...");

    var data = {};

    request.grabWatchedRepos({}, (err, response) => {
        if (err) throw new Error("Error hitting Github API", err);

        console.log("Github response length: " + response.length);

        res.json(response);
    });
  });

};  