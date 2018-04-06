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
  getHistoricalData: (req, res, next) => {
    // const AWS = require('aws-sdk');
    // const csv = require('csvtojson')

    // AWS.config.update({
    //   accessKeyId: process.env.AWS_ACCESS_KEY,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: 'ap-southeast-1'
    // });
    
    // const s3 = new AWS.S3()
    // const options = {
    //   Bucket: 'clp-hist-data', 
    //   Key: 'weather-history/raw/london.csv'
    // }

    // return new Promise((resolve, reject) => {
    //   s3.getObject(options, ((error, data) => {
    //     if(error) reject(error)
    //     console.log('s3 get object successful')
    //     resolve(data.Body.toString('utf-8'))
    //   }))
    // }).then(data => {
    //   console.log('promise returned from fetching s3 object')
    //   let dataArray = data.split('\n')
    //                   .map(item => item.split(','))
    //                   .filter((item, index) => index !== 0)
    //                   .map((curr) => ({
    //                       dt: curr[0],
    //                       dt_iso: curr[1],
    //                       city_id: curr[2],
    //                       city_name: curr[3],
    //                       lat: curr[4],
    //                       lon: curr[5],
    //                       temp: curr[6],
    //                       temp_min: curr[7],
    //                       temp_max: curr[8],
    //                       pressure: curr[9],
    //                       sea_level: curr[10],
    //                       grnd_level: curr[11],
    //                       humidity: curr[12],
    //                       wind_speed: curr[13],
    //                       wind_deg: curr[14],
    //                       rain_1h: curr[15],
    //                       rain_3h: curr[16],
    //                       rain_24h: curr[17],
    //                       rain_today: curr[18],
    //                       snow_1h: curr[19],
    //                       snow_3h: curr[20],
    //                       snow_24h: curr[21],
    //                       snow_today: curr[22],
    //                       clouds_all: curr[23],
    //                       weather_id: curr[24],
    //                       weather_main: curr[25],
    //                       weather_description: curr[26],
    //                       weather_icon: curr[27]
    //                     }))
    //                     .filter(item => item.dt % 2 === 0)
    //   res.status(200).send(dataArray)
    // }).catch(err => JSON.stringify(err))
    res.status(200).send({ message: 'In progress of moving business logic to Athena' })
  }
}

module.exports = weatherController;
