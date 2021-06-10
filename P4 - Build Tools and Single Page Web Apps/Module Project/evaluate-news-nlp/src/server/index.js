var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('dist'));

console.log(__dirname);

const nlpApi = process.env.NLP_API_KEY;
const newsApi = process.env.NEWS_API_KEY;

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

app.post('/nlp', async (req, res) => {
    console.log('NLP URL: ', req.body.url)
    let articleUrl = req.body.url;
    const formdata = new FormData();
    formdata.append("key", nlpApi);
    formdata.append("url", articleUrl);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => response.json())
        .then(({ score_tag, agreement, subjectivity, confidence, irony }) => {
            res.send({ score_tag, agreement, subjectivity, confidence, irony, articleUrl });
        })
        .catch(error => res.status(500).json({ status: 500, message: error }));
});

app.post('/article', async (req, res) => {
    let url,
    query = req.body.formText;
    await fetch(`https://newsapi.org/v2/top-headlines?q=${query}&pageSize=1&apiKey=${newsApi}`)
        .then(response => response.json())
        .then(data => {
            if (data.totalResults === 0) {
                res.status(404).json({ status: 404, message: 'No such articles found' });
            } else {
                url = data.articles[0].url;
            }
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).json({ status: 500, message: 'A server error occured! Try again later' });
        });
    console.log(url);
    res.send({url});
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});
