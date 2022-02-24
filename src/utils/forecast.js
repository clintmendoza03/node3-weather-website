const request = require('request')

const forecast = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7568eb5c6d93858817afc8ca16b4c9f6&query=' + Latitude + ',' + Longitude

    request({url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.error ) {
            callback('Unable to find location. Try another search.', undefined)
        } 
        else {
             callback(undefined, 'The weather description is ' + body.current.weather_descriptions[0] + 
             '. It is currently ' + body.current.temperature + ' degrees out and ' + body.current.humidity + ' % humidity.' + ' There is a ' + body.current.precip + ' % chance of rain.'
             )
        }
    })
}

module.exports = forecast