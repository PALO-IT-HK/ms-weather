const fetch = require('node-fetch')
const config = require('../config');

// Utility Functions
const { formatWeatherData, decodeUtf } = require('../utils/utility')

let weatherController = {
  renderIndex: (req, res, next) => {
    return res.status(200).send({ status: 'OK' })
  },
  healthCheck: (req, res, next) => {
    return res.status(200).send({ status: 'OK', version: '1.0' });
  },
  getFiveDaysWeather: (req, res, next) => {
    const url = `${config.weather_api_url}forecast?q=London&${process.env.WEATHER_API_KEY}`
    fetch(url)
    .then(response => {
      response.json().then(json => {
        res.status(200).send({ 
          list: json.list,
          city: json.city
         })
      })
    })
    .catch(error => {
      console.log(error)
    })
  },
  getFiveDaysWeatherViaLatLong: (req, res, next) => {
    const latitude = req.params.lat
    const longitude = req.params.lon
    const url = `${config.weather_api_url}forecast?lat=${latitude}&lon=${longitude}&${process.env.WEATHER_API_KEY}`
    fetch(url)
    .then(response => {
      response.json().then(json => {
        res.status(200).send({ 
          list: json.list,
          city: json.city })
      })
    })
    .catch(error => {
      console.log(error)
    })
  },
}

module.exports = weatherController;
