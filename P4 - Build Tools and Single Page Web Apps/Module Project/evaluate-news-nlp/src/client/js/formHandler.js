async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let urlForNlp, formText = document.getElementById('query').value;

    if (formText.includes('://')) {
        console.log('Sending query:', formText)
        urlForNlp = formText;
    } else {
        console.log('Sending query not:', formText)
        await fetch('http://localhost:8080/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formText })
        })
            .then(res => res.json())
            .then(data => {
                urlForNlp = data.url;
            })
            .catch(err => console.log('Error: ', err));
    }
    fetch('http://localhost:8080/nlp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlForNlp })
    })
        .then(res => res.json())
        .then(data => {
            for (let [key, value] of Object.entries(data)) {
                if (key !== 'articleUrl') {
                    data[key] = Client.checkForName(value);
                }
            }
            document.getElementById('results').innerHTML = `The <a href='${data.articleUrl}'>article</a>
            has ${data.score_tag} where ${data.agreement}. It also has ${data.subjectivity} as well
            as ${data.irony}.`
        })
        .catch(err => console.log(err))

    console.log("::: Form Submitted :::");
}

export { handleSubmit }
