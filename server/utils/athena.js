const athena = require('athena-client');

const config = require('../config');
const awsGlueDb = config.athenaDb;

const clientConfig = {
  bucketUri: config.athenaResultsBucket,
};

const awsConfig = {
  region: config.awsRegion,
};

/**
 * Get weather history from athena
 * 
 * @param {startDate} - Start Date in ISO8601
 * @param {endDate} - End Date in ISO8601
 * @param {startTime} - Start of Time Range in HH.mm
 * @param {endTime} - End of Time Range in HH.mm
 */
function getHistoryFromAthena({ startDate, endDate, startTime, endTime }) {
  const client = athena.createClient(clientConfig, awsConfig)

  const query = `SELECT ob_time AS time, avg(air_temperature) AS air_temperature, avg(prcp_amt) AS prcp_amt`
    + ` FROM ${config.athenaDb}.weather_midas_data`
    + ` WHERE ob_time BETWEEN from_iso8601_timestamp('${startDate}')`
    + ` AND from_iso8601_timestamp('${endDate}')`
    + ` AND cast(date_format(ob_time, '%H.%i') AS double) BETWEEN ${startTime} AND ${endTime}`
    + ` GROUP BY ob_time ORDER BY ob_time ASC`;

  console.log({
    query,
    startDate,
    endDate,
    startTime,
    endTime,
    msg: 'starting query',
  });

  return client.execute(query).toPromise();
}

module.exports = {
  getHistoryFromAthena,
};
