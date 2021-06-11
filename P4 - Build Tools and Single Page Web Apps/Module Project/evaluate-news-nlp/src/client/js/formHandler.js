async function handleSubmit(event) {
    event.preventDefault();
    const emailRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g

    // check what text was put into the form field
    let urlForNlp, formText = document.getElementById('query').value;
    if (formText === '') {
        alert('Please provide a query or a URL');
        return;
    }

    // Checking whether the input text is an article URL or a query text
    if (emailRegex.test(formText)) {
        urlForNlp = formText;
    } else {
        // The route will make a call to News API and
        // get the URL for the first article that matches the query sent by user
        await fetch('http://localhost:8080/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formText })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 404) {
                    alert('The query has failed!\nPlease provide another query or use an article URL');
                    return;
                }
                urlForNlp = data.url;
            })
            .catch(err => console.log('Error: ', err));
    }

    // Whether the user enters a link or a query,
    // the route will make a call to the Meaning Cloud API
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
            as ${data.irony}. This analysis is done with a confidence of ${data.confidence}%.`
        })
        .catch(err => console.log(err));
}

export { handleSubmit }
