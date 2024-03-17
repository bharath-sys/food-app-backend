// sequelize-init.js
const { Sequelize } = require('sequelize');
const config = require('./dbConfig');

// Initialize Sequelize with the development configuration
const sequelize = new Sequelize(config.development);

// Define your database models
// const Organization = require('../models/Organization')(sequelize);
// const Item = require('../models/Item')(sequelize);
// const Pricing = require('../models/Pricing')(sequelize);


// Export Sequelize and models
module.exports = {
    sequelize
}
