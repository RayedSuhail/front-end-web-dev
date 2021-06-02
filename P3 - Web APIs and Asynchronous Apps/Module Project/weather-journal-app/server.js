// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

// GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST Route
app.post('/addWeather', (req, res) => {
    projectData = req.body;
    res.status(200).json({ status:200, message:'Database updated!' })
})