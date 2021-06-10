import { handleSubmit } from '../src/client/js/formHandler';
import { checkForName } from '../src/client/js/nameChecker';

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
})