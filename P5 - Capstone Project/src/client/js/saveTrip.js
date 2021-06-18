// Save the current trip in the server and update the data stored in local storage
export const saveTrip = async (destination, travelDate) => {
    await fetch('http://localhost:3000/all', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destination, travelDate })
    })
        .then(res => res.json())
        .then(data => localStorage.setItem('trips', JSON.stringify(data)));

    // Repopulate the saved trips
    Client.fetchTrips();
}