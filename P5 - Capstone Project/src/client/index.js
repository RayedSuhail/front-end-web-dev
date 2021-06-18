import { fetchTrips } from './js/fetchTrips';
import { performSearch } from './js/performSearch';
import { saveTrip } from './js/saveTrip';
import { deleteTrip } from './js/deleteTrip';

import './styles/style.scss';

// In case no trip information is stored, a blank array is placed so that no error is thrown by fetchTips()
if(!localStorage.getItem('trips')) {
    localStorage.setItem('trips', JSON.stringify([]));
}

// Add an event listener so that the saved trips list is populated once the document loads
document.addEventListener('DOMContentLoaded', () => {Client.fetchTrips()});

export {
    fetchTrips,
    performSearch,
    saveTrip,
    deleteTrip
}