import { deleteTrip } from '../src/client/js/deleteTrip';
import { fetchTrips } from '../src/client/js/fetchTrips';
import { performSearch } from '../src/client/js/performSearch';
import { saveTrip } from '../src/client/js/saveTrip';
import "babel-polyfill";

const request = require('supertest');
const app = require('../src/server/index');

describe('Check whether functions are defined', () => {
    test('Testing the deleteTrip() function', () => {
        expect(deleteTrip).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof deleteTrip).toBe('function');
    });
    test('Testing the fetchTrips() function', () => {
        expect(fetchTrips).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof fetchTrips).toBe('function');
    });
    test('Testing the performSearch() function', () => {
        expect(performSearch).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof performSearch).toBe('function');
    });
    test('Testing the saveTrip() function', () => {
        expect(saveTrip).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof saveTrip).toBe('function');
    });
});

describe('Checking API call', () => {
    const mockData = [
        { destination: "Kiel", travelDate: "2021-06-18" },
        { destination: "Lucknow", travelDate: "2021-06-18" }
    ]
    it('Should get back the sent data', async () => {
        const res = await request(app)
            .post('/all')
            .send(mockData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockData);
        app.close();
    });
});