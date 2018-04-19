const moment = require('moment');

const { getHistoryFromAthena } = require('../utils/athena');
const weatherUtils = require('../utils/weather');

function getWeatherHistory({
  startDate, endDate, startTime, endTime,
}) {
  return getHistoryFromAthena({
    startDate, endDate, startTime, endTime,
  })
    .then((data) => {
      const weatherData = weatherUtils.transformWeatherHistory(data.records);
      const aggregatedData = weatherUtils.aggregateStatistics(weatherData);
      return {
        weatherData,
        aggregatedData,
      };
    });
}

function getHistory(req, res, next) {
  // Start Date
  const startDate = moment(`${req.params.startDate}T000000Z`).toISOString();
  const endDate = moment(`${req.params.endDate}T235959Z`).toISOString();
  const startTime = '00.00';
  const endTime = '23.59';

  return getWeatherHistory({
    startDate, endDate, startTime, endTime,
  })
    .then(({ weatherData, aggregatedData }) => {
      res.status(200).send({
        status: 'ok',
        data: weatherData,
        aggregated: aggregatedData,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function getHistoryWithTimeRange(req, res, next) {
  const startDate = moment(`${req.params.startDate}T000000Z`).toISOString();
  const endDate = moment(`${req.params.endDate}T235959Z`).toISOString();

  // Convert start/end hour to time
  const startTime = `${req.params.startHour.substr(0, 2)}.00`;
  const endTime = `${req.params.endHour.substr(0, 2)}.59`;

  return getWeatherHistory({
    startDate, endDate, startTime, endTime,
  })
    .then(({ weatherData, aggregatedData }) => {
      res.status(200).send({
        status: 'ok',
        data: weatherData,
        aggregated: aggregatedData,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  getHistory,
  getHistoryWithTimeRange,
};
