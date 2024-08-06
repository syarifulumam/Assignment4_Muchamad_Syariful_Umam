const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the Product API'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      },
      {
        url: process.env.SITE_URL || 'https://assignment4-muchamad-syariful-umam.onrender.com'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./docs/*.js'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
