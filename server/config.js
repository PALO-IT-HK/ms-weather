module.exports = {
  weather_api_url: 'http://api.openweathermap.org/data/2.5/',
  awsRegion: process.env.AWS_REGION || 'ap-southeast-1',
  athenaDb: process.env.ATHENA_DB || 'clp_bike_poc',
  athenaResultsBucket:
    process.env.ATHENA_RESULT_BUCKET ||
    's3://aws-athena-query-results-781857564217-ap-southeast-1',
  is_mock_data: false
};
