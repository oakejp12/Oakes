/**
 * Grab count and append it to appropriate element
 * TODO: Do we really need to return the state of the JSON call?
 */
var github_data = (path, id) => {
    return $.getJSON(path, (data) => {
        console.log(data);
        
        const data_json = JSON.parse(data);
        
        console.log("JSON: " + data_json);

        const actual_data = data_json.data;
        
        document.getElementById(id).innerHTML = actual_data.length;
    })
    .fail((err) => {
        console.error("Error grabbing data.", err);
    })
}

$(document).ready(() => {
    github_data("/repos", "repos"); // Set H2 element to number of repos
    github_data("/followers", "followers"); // Set H2 element to number of followers
    github_data("/commits", "commits");
});