const fetch = require('node-fetch')
const config = require('../config');

// Utility Functions
const { formatWeatherData } = require('../utils/utility')

let weatherController = {
  renderIndex: (req, res, next) => {
    return res.status(200).send({ status: 'OK' })
  },
  getFiveDaysWeather: (req, res, next) => {
    const url = `${config.weather_api_url}forecast?q=London&${config.weather_api_KEY}`
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
    const url = `${config.weather_api_url}forecast?lat=${latitude}&lon=${longitude}&${config.weather_api_KEY}`
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
  showSearchResults: (req, res, next) => {

  }
}

module.exports = weatherController;
