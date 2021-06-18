// Get the stored trips from local storage and remove the trip that was called
// and update the projectData in the server
export const deleteTrip = async (destination, travelDate) => {
    let storedTrips = JSON.parse(localStorage.getItem('trips'));
    let filteredTrips = storedTrips.filter((item) => ((item.destination !== destination) || (item.travelDate !== travelDate)));
    await fetch('http://localhost:3000/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredTrips)
    })
        .then(res => res.json())
        .then(data => localStorage.setItem('trips', JSON.stringify(data)));
        
    // Repopulate the saved trips
    Client.fetchTrips();
}