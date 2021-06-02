/* Global Variables */
// Personal API Key for OpenWeatherMap API
const APIKey = 'e6e450c4b40657846bf4a29890df36f8&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', () => {
    let zip = document.getElementById('zip').value,
        feelings = document.getElementById('feelings').value;
    getWebApi('http://api.openweathermap.org/data/2.5/forecast?', zip, feelings);
});

/* Function to GET Web API Data*/
const getWebApi = async (url, zip, feelings) => {
    let finalURL = `${url}zip=${zip}&appid=${APIKey}`
    await fetch(finalURL)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                postData('/addWeather', {
                    temperature: data.list[0].main.temp,
                    date: newDate,
                    userFeelings: feelings
                });
            }
        })
        .catch(err => console.log('Error: ', err))
}

/* Function to POST data */
const postData = (url = '', data = {}) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(postedData => {
            if (postedData.status === 200) {
                getData('/all');
            } else {
                alert('Some Error has occured');
            }
        })
        .catch(err => console.log('Error: ', err));
}

/* Function to GET Project Data and update UI */
const getData = (url = '') => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("date").innerHTML = `Date: ${data.date}`;
            document.getElementById("temp").innerHTML = `Temperature(°C): ${data.temperature}`;
            if (data.userFeelings) {
                document.getElementById("content").innerHTML = `Feelings: ${data.userFeelings}`;
            }
        })
        .catch(err => console.log('Error: ', err));
}