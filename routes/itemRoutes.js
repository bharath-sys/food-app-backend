const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The item's ID.
 *         type:
 *           type: string
 *           description: The type of the item.
 *         description:
 *           type: string
 *           description: The description of the item.
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Create a new item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to create item
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items.
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Failed to retrieve items
 */
router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve item information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         format: int64
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Failed to retrieve item
 *   put:
 *     summary: Update item by ID
 *     description: Update item information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         format: int64
 *         description: Item ID
 *     requestBody:
 *       description: Updated item data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Item not found
 *       500:
 *         description: Failed to update item
 */
router.get('/:id', itemController.getItemById);
router.put('/:id', itemController.updateItem);

module.exports = router;
