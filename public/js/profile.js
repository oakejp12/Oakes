/**
 * Grab repo count and append it to appropriate element
 * TODO: Do we really need to return the state of the JSON call?
 */
var repo_data = function() { 
    return $.getJSON("/repos", (data) => {
        console.log("Getting repo data from the front...");

        let data_json = JSON.parse(data);

        // Length of the array will tell you how many repos are contained
        let repo_array = data_json.data;

        document.getElementById("repos").innerHTML = repo_array.length;
    })
    .fail((err) => {
        console.error("Error grabbing repo data.", err);
    });
}

/**
 * Grab commit count and append it to the appropriate element
 */
var commit_data = function() {
    return $.getJSON("/commits", (data) => {

    })
    .fail((err) => {
        console.error("Error grabbing commit count.", err);
    });
}

$(document).ready(() => {
    repo_data(); // Set H2 element to number of repos
});