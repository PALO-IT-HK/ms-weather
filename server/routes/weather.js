const express = require('express');

const router = express.Router();
const swagger = require('./swagger');
const weatherController = require('../controllers/weatherController');
const historyController = require('../controllers/historicalData');

/* Healthcheck endpoint for working with Elastic Load Balancer */
router.get('/healthcheck', weatherController.healthCheck);

router.use('/docs', swagger.router);

/**
 * @swagger
 * /current:
 *   get:
 *     description: Get Current Weather
 *     tags:
 *       - weather
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: results
 */
router.get('/current', weatherController.getFiveDaysWeather);

/**
 * @swagger
 * /vialatlon/{lat}/{lon}:
 *   get:
 *     description: Get Weather By Geolocation
 *     tags:
 *       - weather
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: results
 */
router.get(
  '/vialatlon/:lat/:lon',
  weatherController.getFiveDaysWeatherViaLatLong,
);

/**
 * @swagger
 * /history/{startDate}/{endDate}:
 *   get:
 *     description: Get Weather History Data By Date Range
 *     tags:
 *       - weather
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: Start Date of the Weather history query in yyyyMMdd, inclusive
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End Date of the Weather history query in yyyyMMdd, inclusive
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.get('/history/:startDate/:endDate', historyController.getHistory);

/**
 * @swagger
 * /history/{startDate}/{endDate}/{startHour}/{endHour}:
 *   get:
 *     description: Get Weather History Data By Date Range and Time Range
 *     tags:
 *       - weather
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: Start of the date range for weather history query in yyyyMMdd, inclusive
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for weather history query in yyyyMMdd, inclusive
 *         in: path
 *         required: true
 *         type: string
 *       - name: startHour
 *         description: Start of the time range for weather history query in HH (24-hrs), inclusive
 *         in: path
 *         required: true
 *         type: string
 *       - name: endHour
 *         description: End of the time range for weather history query in HH (24-hrs), inclusive
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.get(
  '/history/:startDate/:endDate/:startHour/:endHour',
  historyController.getHistoryWithTimeRange,
);

module.exports = router;
