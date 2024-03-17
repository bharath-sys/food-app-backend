const Item = require('../models/Item');

// Service methods for items
function createItem(type, description) {
    return new Promise((resolve, reject) => {
        Item.create({ type, description })
            .then(newItem => resolve(newItem))
            .catch(error => reject(error));
    });
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        Item.findAll()
            .then(items => resolve(items))
            .catch(error => reject(error));
    });
}

function getItemById(id) {
    return new Promise((resolve, reject) => {
        Item.findByPk(id)
            .then(item => resolve(item))
            .catch(error => reject(error));
    });
}

function updateItem(id, type, description) {
    return new Promise((resolve, reject) => {
        Item.findByPk(id)
            .then(item => {
                if (!item) {
                    return reject(new Error('Item not found'));
                }
                item.type = type;
                item.description = description;
                return item.save();
            })
            .then(updatedItem => resolve(updatedItem))
            .catch(error => reject(error));
    });
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem
};
