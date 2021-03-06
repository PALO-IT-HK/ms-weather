const fetch = require('node-fetch');
const config = require('../config');

const weatherController = {
  renderIndex: (req, res) => res.status(200).send({ status: 'OK' }),
  healthCheck: (req, res) => res.status(200).send({ status: 'OK', version: '1.0' }),

  getFiveDaysWeather: (req, res, next) => {
    const url = `${config.weather_api_url}forecast?q=London&APPID=${process.env.WEATHER_API_KEY}`;
    fetch(url)
      .then((response) => {
        response.json().then((json) => {
          res.status(200).send({
            list: json.list,
            city: json.city,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },

  getFiveDaysWeatherViaLatLong: (req, res, next) => {
    const latitude = req.params.lat;
    const longitude = req.params.lon;
    const url = `${config.weather_api_url}forecast?lat=${latitude}&lon=${longitude}&APPID=${process.env.WEATHER_API_KEY}`;
    fetch(url)
      .then((response) => {
        response.json().then((json) => {
          res.status(200).send({
            list: json.list,
            city: json.city,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
};

module.exports = weatherController;
