var express = require('express');
var router = express.Router();
const weatherController = require('../controllers/weatherController');

/* GET home page. */
router.get('/', weatherController.renderIndex);

module.exports = router;
