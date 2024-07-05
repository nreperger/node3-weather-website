const request = require('postman-request');

const geocode = (address, callback) => {
    const limit = 1;
    const token = 'pk.eyJ1IjoibnJlcGVyZ2VyIiwiYSI6ImNseGRoYTdvMjA1cGIya3BzaG5veWd3aHMifQ.krlbB5gjiIVy5-WnVIwxzA';
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=' + limit + '&access_token=' + token;

    request({ url: geocodeURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            const place_name = body.features[0].place_name;
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];

            callback(undefined, {
                latitude,
                longitude,
                location: place_name
            });
        }
    });
};

module.exports = geocode;