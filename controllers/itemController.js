// controllers/itemController.js
const itemService = require('../services/itemService');

// Controller methods for items
async function createItem(req, res) {
    try {
        const newItem = await itemService.createItem(req.body.type, req.body.description);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create item', message: error.message });
    }
}

async function getAllItems(req, res) {
    try {
        const items = await itemService.getAllItems();
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch items', message: error.message });
    }
}

async function getItemById(req, res) {
    const id = req.params.id;
    try {
        const item = await itemService.getItemById(id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch item', message: error.message });
    }
}

async function updateItem(req, res) {
    const id = req.params.id;
    const { type, description } = req.body;
    try {
        const updatedItem = await itemService.updateItem(id, type, description);
        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item', message: error.message });
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem
};
