/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// TODO-Express to run server and routes
const express = require('express');
// TODO-Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;
// Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log('Server is running!');
    console.log(`Server is running on localhost: ${port}`);
};