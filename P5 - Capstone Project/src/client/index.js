import { fetchTrips } from './js/fetchTrips';
import { performSearch } from './js/performSearch';
import { saveTrip } from './js/saveTrip';
import { deleteTrip } from './js/deleteTrip';

import './styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {Client.fetchTrips()});

export {
    fetchTrips,
    performSearch,
    saveTrip,
    deleteTrip
}