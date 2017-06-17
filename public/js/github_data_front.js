
/**
 * Grab repo count and append it to appropriate div
 */
$.getJSON("/repos", (data) => {
    var items = [];

    $.each(data, (key, value) => {
        // Append to appropriate div
    });
});