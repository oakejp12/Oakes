const functions  = require('firebase-functions');
const express    = require('express');
const bodyParser = require('body-parser');
const http       = require('http');
const path       = require('path');
const favicon    = require('serve-favicon');

// Set up the Express application
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

require(path.join(__dirname, 'routes', 'html-routes.js'))(app);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

// Create and Deploy Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
