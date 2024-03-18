// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API endpoints'
        },
        servers: [
            {
                url: 'https://food-app-backend-df1q.onrender.com', // Change this URL to match your server's URL
                description: 'Development server'
            }
        ]
    },
    apis: ['./routes/*.js'] // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs)
};
