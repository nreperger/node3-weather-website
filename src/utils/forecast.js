const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const apiKey = 'd3ed0701df44b6c4f8fcbce44dfcb071';
    const unit = 'm';
    const query = latitude + ',' + longitude;

    const url = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&units=' + unit + '&query=' + encodeURIComponent(query);

    request({ url, json: true }, (error, { body } = {}) => {    
        if (error) {
            callback('Unable to connect to weather services!');
        } else if (body.error) {
            callback('Unable to connect to find location!');
        } else {
            const description = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const humidity = body.current.humidity;

            callback(undefined, description + '. It is currently ' + temperature + ' degress. It feels like ' + feelslike + ' degress. The humidity is ' + humidity + '%.');
        }
    });
};

module.exports = forecast;