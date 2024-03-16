const winston = require('winston');

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'white'
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

winston.addColors(colors);

module.exports = logger;
