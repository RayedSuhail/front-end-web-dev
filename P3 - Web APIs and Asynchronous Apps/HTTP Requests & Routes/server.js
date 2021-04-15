var express = require('express');
var app = express();

// Create JS object
const appData = {};

// Respond with JS object when a GET request is made to the homepage
app.get('/all', function (req, res) {
  res.send(appData)
});

// POST method route
app.post('/', function (req, res) {
    res.send('POST received')
});