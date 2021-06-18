# Weather-Journal App Project

## Overview
This project requires you to create a trip journal app that retrieves information about the loaction and the user can save their trip information. 

## Dependencies

### Frameworks/Libraries Used
- [Bootstrap](https://getbootstrap.com/) - The CSS framework used
- [Sass](https://sass-lang.com/documentation) - The web framework used
- [Webpack](https://webpack.js.org/concepts/) - Asset Management
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Express.js](https://expressjs.com/) - Server Framework for Node.js
- [Jest](https://jestjs.io/) - Testing suite
- [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) - For offline capability

### APIs Used
- [Geonames API](http://www.geonames.org/export/web-services.html) - Geographical database from which the location data is pulled
- [WeatherBit API](https://www.weatherbit.io/) - Weather API for current and future weather data
- [Pixabay API](https://pixabay.com/api/docs/) - RESTful interface for searching and retrieving free images and videos

## Instructions
Please run `npm install` in this folder and set up the .env file with the appropriate API keys.

### Set up Development Server
You can run the development server with the command `npm run build-dev` which will run the server on [localhost:8080](http://localhost:8080 "Dev Server"). However, you will need to run the Express server by running `npm run start` as the functionalities is dependant on it.

### Set up Production Server
If you do not wish to have two ports occupied by the app, first run `npm run build-prod` and then `npm run start` to get a dist folder which has the distribution files ready for the server. Then open [localhost:3000](http://localhost:3000 "Production Server") and use the app.
