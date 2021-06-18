import { fetchTrips } from './js/fetchTrips';
import { performSearch } from './js/performSearch';
import { saveTrip } from './js/saveTrip';
import { deleteTrip } from './js/deleteTrip';

import './styles/style.scss';

if(!localStorage.getItem('trips')) {
    localStorage.setItem('trips', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', () => {Client.fetchTrips()});

export {
    fetchTrips,
    performSearch,
    saveTrip,
    deleteTrip
}