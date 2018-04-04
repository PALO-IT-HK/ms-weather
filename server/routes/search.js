var express = require('express');
var router = express.Router();
const weatherController = require('../controllers/weatherController');

/* GET home page. */
router.get('/current', weatherController.getFiveDaysWeather);
router.get('/vialatlon/:lat/:lon', weatherController.getFiveDaysWeatherViaLatLong);
router.get('/historical', weatherController.getHistoricalData);

module.exports = router;