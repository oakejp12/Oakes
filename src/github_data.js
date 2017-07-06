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
exports.grabFollowers = (requestOptions, callback) => {
    console.log("Grabbing watched repos...");

    // Query for all the watched repos
    github.users.getFollowers({}, (err, res) => callback(err, JSON.stringify(res)));
}
 
/**
 * Get count of commits made in Github 
 * @param {*} requestOptions
 * @param {*} callback
 */
exports.grabCommitCount = (requestOptions, callback) => {
    console.log("Grabbing commit count");
    this.grabRepoCount({}, (err, response) => {
        process(response);
    });

    function process(response) {
        let data_json = JSON.parse(response.data);

        // Get all of the repos
        // For each repo, get all of the commit data
        // TODO: There has to be a shorter way to get this...
        data_json.forEach((item) => {
            github.repos.getCommits({
                owner: "oakejp12",
                repo: item.name
            }, (err, res) => callback(err, res));
        });
    }
}

/**
 * Get count for how many repos I have
 * @param {*} requestOptions
 * @param {*} callback 
*/
exports.grabRepoCount = (requestOptions, callback) => {
    console.log("Grabbing repo count");

    github.repos.getAll({ visibility: "all", }, (err, res) => callback(err, JSON.stringify(res)));
}
