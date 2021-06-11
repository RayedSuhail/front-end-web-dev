import { handleSubmit } from '../src/client/js/formHandler';
import { checkForName } from '../src/client/js/nameChecker';
import "babel-polyfill";

const request = require('supertest');
const app = require('../src/server/index');

describe('Testing the submit functionality', () => {
    test('Testing the handleSubmit() function', () => {
        expect(handleSubmit).toBeDefined();
    });
    test('It should be a function', () => {
        expect(typeof handleSubmit).toBe('function');
    });
});

describe('The nameChecker function returns proper values', () => {
    const words = {
        'P+': 'strong positive',
        'P': 'positive',
        'NEU': 'neutral',
        'N': 'negative',
        'N+': 'strong negative',
        'NONE': 'without',

        'AGREEMENT': 'the different elements have the same polarity',
        'DISAGREEMENT': 'there is disagreement between the different elements\' polarity',

        'OBJECTIVE': 'objective remarks',
        'SUBJECTIVE': 'subjective remarks',

        'NONIRONIC': 'no ironic remarks',
        'IRONIC': 'ironic remarks'
    }
    for (const [key, value] of Object.entries(words)) {
        let checkWord = checkForName(key);
        expect(checkWord).toBe(value);
    }
});

describe('Checking API call', () => {
    it('Should get an article link', async () => {
        const res = await request(app)
            .post('/article')
            .send({
                formText: 'corona'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('url');
        app.close();
    });
});