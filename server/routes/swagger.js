const express = require('express');
const router = express.Router();

const options = {
  swaggerDefinition: {
    info: {
      title: 'Weather API Swagger',
      version: '1.0.0',
      description: 'Weather Data RESTful API',
      contact: {
        email: 'btse@palo-it.com'
      }
    },
    tags: [
      {
        name: 'weather',
        description: 'Weather Data API'
      }
    ],
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/'
  },
  apis: [
    './server/routes/weather.js'
  ]
};

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options);

router.get('/json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {
  router
};
