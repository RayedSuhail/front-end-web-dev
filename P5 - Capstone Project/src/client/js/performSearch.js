// Performs search functionality for the provided data by the user
export const performSearch = async (event) => {
    event.preventDefault();
    let tripDestination = {};
    document.getElementById('search-container').innerHTML = '';
    const query = document.getElementById('city').value;
    const dateOfTravel = document.getElementById('travelDate').value;
    const diffTime = Math.abs(new Date(dateOfTravel) - new Date());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Make sure no input is left blank
    if (!query && !dateOfTravel) {
        alert('Please enter a query of a place to search for and the date of travel.');
        return;
    } else if (!query) {
        alert('Please provide a query');
        return;
    } else if (!dateOfTravel) {
        alert('Please provide a date of travel');
        return;
    }

    // Fetch call that gets all relevant data regarding the trip from the server
    await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, diffDays })
    })
        .then(res => res.json())
        .then(data => {
            tripDestination = data.card;
        });

    // Place the trip data in the document
    document.getElementById('search-container').innerHTML = `<h3>Search Result</h3><hr/>
    <div class="card mb-3">
        <div class="row py-3 g-0">
            <div class="col-md-4">
                <img src="${tripDestination.pixbay.pixabay.src}" alt="${tripDestination.pixbay.pixabay.alt}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" id="saveCity">${tripDestination.geonames.name}</h5>
                    <p class="card-text">
                        ${tripDestination.geonames.countryName}, ${tripDestination.geonames.countryCode}
                    </p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Date of Travel:
                            <span class="text-muted" id="saveDate">${dateOfTravel}</span>
                        </li>
                        <li class="list-group-item">This trip is ${diffDays - 1} day(s) away</li>
                        <li class="list-group-item">
                            <strong>Actual Temp</strong> High: ${tripDestination.weatherbit.high_temp}°C
                            Low: ${tripDestination.weatherbit.low_temp}°C
                        </li>
                        <li class="list-group-item"><strong>Feels Like</strong> 
                            High: ${tripDestination.weatherbit.app_max_temp}°C
                            Low: ${tripDestination.weatherbit.app_min_temp}°C
                        </li>
                        <li class="list-group-item">
                            <img
                                src="https://www.weatherbit.io/static/img/icons/${tripDestination.weatherbit.weather.icon}.png"
                                alt="${tripDestination.weatherbit.weather.description}"
                                width="30px"
                            />
                            ${tripDestination.weatherbit.weather.description}
                        </li>
                    </ul>
                    <button type="button" onclick="return Client.saveTrip('${query}', '${dateOfTravel}')" class="btn btn-secondary float-end"><i
                        class="far fa-save"></i> Save Trip</button>
                </div>
            </div>
        </div>
    </div>`;
}