/**
 * Grab count and append it to appropriate element
 * TODO: Do we really need to return the state of the JSON call?
 */
var github_data = (path, id) => {
    return $.getJSON(path, (data) => {
        const data_json = (JSON.parse(data)).data;

        console.dir(data_json);
        
        document.getElementById(id).innerHTML = data_json.length;
    })
    .fail((err) => {
        console.error("Error grabbing data.", err);
    })
}

$(document).ready(() => {
    github_data("/repos", "repos"); // Set H2 element to number of repos
    github_data("/followers", "followers"); // Set H2 element to number of followers
    // github_data("/commits", "commits");
});