// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');
const fetch = require('node-fetch');

// Setting up API Keys from .env file
const dotenv = require('dotenv');
dotenv.config();
const weatherAPI = process.env.WEATHERBIT_API_KEY;
const pixabayAPI = process.env.PIXABAY_API_KEY;
const geonamesAPI = process.env.GEONAMES_API_KEY;

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
app.use(express.static('dist'));


// Setup Server
const port = 3000;
module.exports = app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

// Project Data
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Replace projectData with the incoming information
app.post('/all', (req, res) => {
    projectData = req.body;
    res.send(projectData);
})

// Place the new trip details into projectData
app.put('/all', (req, res) => {
    if (!projectData.find(item => ((item.destination === req.body.destination) && (item.travelDate === req.body.travelDate)))) {
        projectData.push(req.body);
    }
    res.send(projectData);
})

// Perform search functionality and get all relevant trip data from other routes
app.post('/search', async (req, res) => {
    let query = req.body.query,
        diffDays = req.body.diffDays,
        tripDestination = {};

    // Call to GeoNames API to get latitude and longitude of the location
    await fetch(`http://api.geonames.org/searchJSON?name=${query}&maxRows=1&username=${geonamesAPI}`)
        .then(resGeo => resGeo.json())
        .then(async geonames => {
            tripDestination['geonames'] = geonames.geonames[0];

            // Fetch call to retrieve weather information of location
            await fetch('http://localhost:3000/temperature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: tripDestination.geonames.lat,
                    lng: tripDestination.geonames.lng,
                    days: diffDays
                })
            })
                .then(resWeather => resWeather.json())
                .then(async weatherbit => {
                    tripDestination['weatherbit'] = weatherbit.weatherbit;

                    // Fetch call to get URL of an image of the location
                    await fetch('http://localhost:3000/pixbay', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ query })
                    })
                        .then(resPix => resPix.json())
                        .then(pixbay => {
                            tripDestination['pixbay'] = pixbay;
                            return res.status(200).json({ status: 200, message: 'Query matched!', card: tripDestination });
                        })
                        .catch(err => res.status(500).json({ status: 500, message: `Error: ${err}` }));
                })
                .catch(err => res.status(500).json({ status: 500, message: `Error: ${err}` }));
        })
        .catch(err => res.status(500).json({ status: 500, message: `Error: ${err}` }));
});

// Provide weather information based on the latitude and longitude and how far away the trip is
app.post('/temperature', async (req, res) => {
    let lat = req.body.lat,
        lng = req.body.lng,
        days = req.body.days;
    // Call to WeatherBit API to get weather information of the location on the day of the trip
    await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?days=${days + 1}&lat=${lat}&lon=${lng}&key=${weatherAPI}`)
        .then(response => response.json())
        .then(data => {
            return res.status(200).json({ status: 200, message: 'Query matched!', weatherbit: data.data[days] });
        })
        .catch(err => res.status(500).json({ status: 500, message: `Error: ${err}` }));
});

// Provide an image URL for the given location name
app.post('/pixbay', async (req, res) => {
    let query = req.body.query;

    // Call to Pixabay API to get the URL of an image of the location
    await fetch(`https://pixabay.com/api/?key=${pixabayAPI}&category=travel&orientation=vertical&q=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length === 0) {
                return res.status(400).json({ status: 400, message: 'No image matched', pixabay: { src: 'https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg', alt: query } })
            }
            return res.status(200).json({ status: 200, message: 'Query matched!', pixabay: { src: data.hits[0].largeImageURL, alt: query } });
        })
        .catch(err => res.status(500).json({ status: 500, message: `Error: ${err}` }));
});