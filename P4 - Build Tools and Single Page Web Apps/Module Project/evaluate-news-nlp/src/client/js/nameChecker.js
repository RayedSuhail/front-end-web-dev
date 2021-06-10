function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
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
    inputText = words[inputText];
    return inputText;
}

export { checkForName }
