const request = require('../src/github_data');

module.exports = function(app) {

  app.get("/repos", (req, res) => {
    console.log("Hitting the index path...");

    request.grabWatchedRepos({
    }, (err, res) => {
        if (err) throw new Error("Error hitting Github API", err);

        console.log("Github response length: " + res.length);
    });    
  });
};