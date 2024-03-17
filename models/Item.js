const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/sequelize_init'); // Import sequelize from sequelize-init.js

const Item = sequelize.define('item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Item;