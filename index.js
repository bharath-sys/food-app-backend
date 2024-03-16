const express = require('express');
const { config } = require('dotenv');
const logger = require('./logger');

const app = express();
config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = app.listen(port, () => {
    logger.info(`Server is listening at http://localhost:${port}`);
});

server.on('error', (error) => {
    logger.error('Error starting the server:', error);
});
