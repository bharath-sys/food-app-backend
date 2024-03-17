const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/sequelize_init'); // Import sequelize from sequelize-init.js
const Organization = require('./Organization');
const Item = require('./Item');

const Pricing = sequelize.define('pricing', {
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organization,
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Item,
            key: 'id'
        }
    },
    zone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    base_distance_in_km: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    km_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fix_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Pricing;
