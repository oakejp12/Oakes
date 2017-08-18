//@ts-check
const GitHubApi = require('github');

const config = require('../config/config');

const github = new GitHubApi({
    protocol: "https",
    host: "api.github.com", // Note: Adding HTTPS:// gives a DNSLookup Error
    headers: {
        "Content-Type":  "application/json",
        "Accept": "application/vnd.github.v3.full+json",
        "User-Agent": config.gh_username
    },
    followRedirects: false,
    timeout: 5000,
});

github.authenticate({
    type: "oauth",
    token: config.gh_creds,
});


/**
* Grab certain Github global data based on options
* @param {*} requestOptions HTTP request options
* @param {*} callback 
*/
let grabFollowers = (requestOptions, callback) => {
    console.log("Grabbing watched repos...");

    // Query for all the watched repos
    github.users.getFollowers({}, (err, res) => callback(err, JSON.stringify(res)));
}
 
/**
* Get count of commits made in Github 
* @param {*} requestOptions
* @param {*} callback
*/
let grabCommitCount = (requestOptions, callback) => {
    console.log("Grabbing commit count");

    grabRepoCount({}, (err, response) => {
        process(JSON.parse(response));
    });

    function process(response) {
        let data_json = response.data;

        const repo_count = data_json.length; // Holds the number of repos to hold still for
        let response_obj = new Map(); // Obj to hold commits 

        // Get all of the repos - for each repo, get all of the commit data
        // TODO: There has to be a shorter way to get this...
        let counter = 0; // Holds how many repos we have looked at so far
        data_json.forEach(item => {
            github.repos.getCommits({
                owner: item.owner.login,
                repo: item.name
            }, (err, res) => {
                if (err) throw new Error("Error grabbing commits from repos: " + err);
                response_obj.set(counter, res); // Push responses to an array since we are waiting for all repos
                counter++;
                if (counter === repo_count && response_obj.size > 0) {
                    console.log("Commit: Time to call the callback!");
                    callback(err, response_obj);
                }
            });
        });
    }
}

/**
* Get count for how many repos I have
* @param {*} requestOptions
* @param {*} callback 
*/
let grabRepoCount = (requestOptions, callback) => {
    console.log("Grabbing repo count");
    github.repos.getAll({ visibility: "all", }, (err, res) => callback(err, JSON.stringify(res)));
}


module.exports = {
    grabRepoCount: grabRepoCount,
    grabCommitCount: grabCommitCount,
    grabFollowers: grabFollowers
}