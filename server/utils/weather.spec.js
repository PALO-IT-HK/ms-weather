const expect = require('chai').expect;

const weatherUtils = require('./weather');

const athenaSampleData = [
  {
    "time": "2012-01-01 00:00:00.000",
    "air_temperature": "3.0",
    "prcp_amt": "0"
  }, {
    "time": "2012-01-01 01:00:00.000",
    "air_temperature": "2.6",
    "prcp_amt": "0.2"
  },
  {
    "time": "2012-01-02 00:00:00.000",
    "air_temperature": "10.0",
    "prcp_amt": "0.5"
  }, {
    "time": "2012-01-02 01:00:00.000",
    "air_temperature": "12.0",
    "prcp_amt": "0.8"
  }
];

const transformedData = [
  {
    "datetime": "2012-01-01T00:00:00.000Z",
    "date": "2012-01-01",
    "time": "00:00:00.000",
    "air_temperature": 3,
    "prcp_amt": 0
  }, {
    "datetime": "2012-01-01T01:00:00.000Z",
    "date": "2012-01-01",
    "time": "01:00:00.000",
    "air_temperature": 2.6,
    "prcp_amt": 0.2
  }, {
    "datetime": "2012-01-02T00:00:00.000Z",
    "date": "2012-01-02",
    "time": "00:00:00.000",
    "air_temperature": 10.0,
    "prcp_amt": 0.5
  }, {
    "datetime": "2012-01-02T01:00:00.000Z",
    "date": "2012-01-02",
    "time": "01:00:00.000",
    "air_temperature": 12.0,
    "prcp_amt": 0.8
  }
];

const aggregateData = {
  "2012-01-01": {
    "avg_air_temperature": 2.8,
    "total_prcp_amt": 0.2
  },
  "2012-01-02": {
    "avg_air_temperature": 11.0,
    "total_prcp_amt": 1.3
  }
}

describe('weather utilities', () => {
  it('should transform weather history properly', () => {
    expect(weatherUtils.transformWeatherHistory(athenaSampleData)).deep.equal(transformedData);
  });

  it('should aggregate weather data properly', () => {
    expect(weatherUtils.aggregateStatistics(transformedData)).deep.equal(aggregateData);
  });
});
