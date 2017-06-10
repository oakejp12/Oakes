const express = require('express');
const bodyParser = require('body-parser');

// Set up the Express application
let app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
