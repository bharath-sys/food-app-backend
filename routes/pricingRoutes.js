const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');
const { body } = require('express-validator');

/**
 * @swagger
 * /pricing/calculate-price:
 *   post:
 *     summary: Calculate total price
 *     description: Calculate the total price based on zone, organization ID, total distance, and item type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: Zone name
 *                 example: "east"
 *               organization_id:
 *                 type: string
 *                 description: Organization ID
 *                 example: "006"
 *               total_distance:
 *                 type: number
 *                 description: Total distance in kilometers
 *                 example: 10
 *               item_type:
 *                 type: string
 *                 description: Type of item
 *                 example: "perishable"
 *     responses:
 *       200:
 *         description: Total price calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   description: Calculated total price
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/calculate-price',[[
    body('zone').notEmpty().withMessage('Zone is required'),
    body('organization_id').notEmpty().withMessage('Organization ID is required'),
    body('total_distance').notEmpty().withMessage('Total distance is required'),
    body('item_type').notEmpty().withMessage('Item type is required')
]], pricingController.calculatePrice);

/**
 * @swagger
 * /pricing:
 *   get:
 *     summary: Get all pricings
 *     description: Retrieve a list of all pricings.
 *     responses:
 *       200:
 *         description: A list of pricings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   organization_id:
 *                     type: string
 *                   item_id:
 *                     type: string
 *                   zone:
 *                     type: string
 *                   base_distance_in_km:
 *                     type: number
 *                   km_price:
 *                     type: string
 *                   fix_price:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('/', pricingController.getAllPricing);

/**
 * @swagger
 * /pricing:
 *   post:
 *     summary: Create a new pricing
 *     description: Create a new pricing record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: string
 *               item_id:
 *                 type: string
 *               zone:
 *                 type: string
 *               base_distance_in_km:
 *                 type: number
 *               km_price:
 *                 type: string
 *               fix_price:
 *                 type: number
 *             required:
 *               - organization_id
 *               - item_id
 *               - zone
 *               - base_distance_in_km
 *               - km_price
 *               - fix_price
 *     responses:
 *       201:
 *         description: Pricing created successfully
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/', pricingController.createPricing);

/**
 * @swagger
 * /pricing/{organizationId}/{itemId}:
 *   get:
 *     summary: Get pricing by organization ID and item ID
 *     description: Retrieve pricing information for a specific organization and item.
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Pricing information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 organization_id:
 *                   type: string
 *                 item_id:
 *                   type: string
 *                 zone:
 *                   type: string
 *                 base_distance_in_km:
 *                   type: number
 *                 km_price:
 *                   type: string
 *                 fix_price:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Pricing not found
 *       500:
 *         description: Internal server error
 */
router.get('/:organizationId/:itemId', pricingController.getPricingByOrganizationAndItem);

/**
 * @swagger
 * /pricing/{organizationId}/{itemId}:
 *   put:
 *     summary: Update pricing by organization ID and item ID
 *     description: Update pricing information for a specific organization and item.
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization ID
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               base_distance_in_km:
 *                 type: number
 *               km_price:
 *                 type: string
 *               fix_price:
 *                 type: number
 *             required:
 *               - zone
 *               - base_distance_in_km
 *               - km_price
 *               - fix_price
 *     responses:
 *       200:
 *         description: Pricing updated successfully
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *       404:
 *         description: Pricing not found
 *       500:
 *         description: Internal server error
 */
router.put('/:organizationId/:itemId', pricingController.updatePricing);

module.exports = router;
