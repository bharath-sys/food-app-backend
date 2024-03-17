const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/sequelize_init'); // Import sequelize from sequelize-init.js

const Organization = sequelize.define('organization', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Organization;
