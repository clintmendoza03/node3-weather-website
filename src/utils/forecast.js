const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=7568eb5c6d93858817afc8ca16b4c9f6&query=37.8267,-122.4233&units=f'

// request({url: url, json: true }, (error, response) => {
//     const precip = response.body.current.precip
//     const temperature = response.body.current.temperature
//     const weatherDescription = response.body.current.weather_descriptions[0]
//     console.log(weatherDescription + '. It is currently ' + temperature + ' degrees out. There is a ' + precip + ' chance of rain.')
// })

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
             callback(undefined, 'It\'s ' + body.current.weather_descriptions[0] + 
             '. It is currently ' + body.current.temperature + ' degrees out. ' +
              'There is a ' + body.current.precip + ' chance of rain'
                // precip: response.body.current.precip,
                // temperature: response.body.current.temperature,
                // weatherDescription: response.body.current.weather_descriptions[0]
             )
        }
    })
}

module.exports = forecast