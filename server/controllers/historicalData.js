const config = require('../config');
const athena = require('athena-client');
const moment = require('moment');

const awsGlueDb = config.athenaDb;

const clientConfig = {
  bucketUri: config.athenaResultsBucket,
};

const awsConfig = {
  region: config.awsRegion,
};

function getHistoryFromAthena({startDate, endDate, startTime, endTime}) {
  const client = athena.createClient(clientConfig, awsConfig)

  const query = `SELECT ob_time AS time, avg(air_temperature) AS air_temperature, avg(prcp_amt) AS prcp_amt`
    + ` FROM ${config.athenaDb}.weather_midas_data`
    + ` WHERE ob_time BETWEEN from_iso8601_timestamp('${startDate.toISOString()}')`
    + ` AND from_iso8601_timestamp('${endDate.toISOString()}')`
    + ` AND cast(date_format(ob_time, '%H.%i') AS double) BETWEEN ${startTime} AND ${endTime}`
    + ` GROUP BY ob_time ORDER BY ob_time ASC`;

  console.log({
    query,
    msg: 'starting query',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    startTime: startTime,
    endTime: endTime,
  });
  
  return client.execute(query).toPromise();
}

function getHistory (req, res, next) {
  // Start Date
  const startDate = moment(`${req.params.startDate}T000000Z`);
  const endDate = moment(`${req.params.endDate}T235959Z`);
  const startTime = '00.00';
  const endTime = '23.59';

  return getHistoryFromAthena({startDate, endDate, startTime, endTime})
    .then((data) => {
      res.status(200).send({
        status: 'ok',
        data: data.records.map((row) => ({ ...row, time: moment(`${row.time}Z`, 'YYYY-MM-DD HH:mm:ss.SSSZ').toISOString()})),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 'internal server error',
        params: req.params,
      });
    });
};

function getHistoryWithTimeRange (req, res, next) {
  const startDate = moment(`${req.params.startDate}T000000Z`);
  const endDate = moment(`${req.params.endDate}T235959Z`);

  // Convert start/end hour to time
  const startTime = `${req.params.startHour.substr(0, 2)}.00`;
  const endTime = `${req.params.endHour.substr(0, 2)}.59`;

  return getHistoryFromAthena({ startDate, endDate, startTime, endTime })
    .then((data) => {
      res.status(200).send({
        status: 'ok',
        data: data.records.map((row) => ({ ...row, time: moment(`${row.time}Z`, 'YYYY-MM-DD HH:mm:ss.SSSZ').toISOString() })),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 'internal server error',
        params: req.params,
      });
    });
};

module.exports = {
  getHistoryFromAthena,
  getHistory,
  getHistoryWithTimeRange,
};