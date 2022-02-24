const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoiemVubG91NjIwIiwiYSI6ImNrenQ4M3FxOTdiMHEyb25rZ2YzYmJ5OWsifQ.jgmTwT8oep4k1uWpP7HInA'
    
    request({url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length ===0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
             callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
             })
        }
    })
}
module.exports = geocode