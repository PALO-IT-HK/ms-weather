const moment = require('moment');

function transformWeatherHistory(records) {
  return records.map((row) => {
    const datetime = moment(`${row.time}Z`, 'YYYY-MM-DD HH:mm:ss.SSSZ').utc();
    return {
      datetime: datetime.toISOString(),
      date: datetime.format('YYYY-MM-DD'),
      time: datetime.format('HH:mm:ss.SSS'),
      air_temperature: Number(row.air_temperature),
      prcp_amt: Number(row.prcp_amt),
    };
  });
}

function aggregateStatistics(records) {
  const groupByDate = records.reduce((accum, hourlyRecord) => ({
    ...accum,
    [hourlyRecord.date]: [
      ...(accum[hourlyRecord.date] || []),
      {
        air_temperature: hourlyRecord.air_temperature,
        prcp_amt: hourlyRecord.prcp_amt,
      },
    ],
  }), {});

  return Object.keys(groupByDate).reduce((accum, date) => ({
    ...accum,
    [date]: {
      avg_air_temperature: groupByDate[date].reduce(
        (sum, hourlyRecord) => sum + hourlyRecord.air_temperature,
        0,
      ) / groupByDate[date].length,
      total_prcp_amt: groupByDate[date].reduce(
        (sum, hourlyRecord) => sum + hourlyRecord.prcp_amt,
        0,
      ),
    },
  }), {});
}

module.exports = {
  transformWeatherHistory,
  aggregateStatistics,
};
