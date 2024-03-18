const express = require('express');
const { config } = require('dotenv');
const logger = require('./logger');
const organizationRoutes = require('./routes/organizationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const pricingRoutes = require('./routes/pricingRoutes');
const swagger = require('./swagger');
const cors = require('cors');
const bodyParser = require('body-parser');

const { sequelize } = require('./database/sequelize_init');

const app = express();
config();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api-docs', swagger.serve, swagger.setup);
app.use('/organizations', organizationRoutes);
app.use('/pricing', pricingRoutes);
app.use('/items', itemRoutes);

// Database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        logger.info('Database connection successful');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the application if database connection fails
    }
}

testDatabaseConnection();

// Redirect root URL to Swagger UI route
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// Start the server
const server = app.listen(port, () => {
    logger.info(`Server is listening at http://localhost:${port}`);
});

// Error handling
server.on('error', (error) => {
    logger.error('Error starting the server:', error);
});
