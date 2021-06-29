const request = require("request");

forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dfb2fc9600ebe958b39ccafdecd41dda&query=`+ lat + ',' + long ;

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connet to weather service", undefined)
        } else if(response.body.error){
            callback("Unable to find the location", undefined)
        }else {
            const dear = response.body.current; 
            callback(undefined, dear.weather_descriptions[0] + '. It is currently ' + dear.temperature + ' degrees out. It feels like '+ dear.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast;