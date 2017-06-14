//@ts-check
const GitHubApi = require('github');
const config = require('../config/config');

const github = new GitHubApi({
    protocol: "https",
    host: "api.github.com", // Note: Adding HTTPS:// gives a DNSLookup Error
    headers: {
        "Content-Type":  "application/json",
        "Accept": "application/vnd.github.v3.full+json",
        "User-Agent": "oakejp12"
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
exports.grabWatchedRepos = function (requestOptions, callback) {
    console.log("Grabbing watched repos...");

    // Query for all the watched repos
    github.activity.getWatchedRepos({}, (err, res) => callback(err, JSON.stringify(res)));
}
 
