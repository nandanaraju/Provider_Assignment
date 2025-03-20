const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Provider State License Verification API',
      version: '1.0.0',
    },
  },
  apis: [path.resolve(__dirname, './src/routes/*.js')], // Ensure correct path
};

module.exports = swaggerJsdoc(options);
