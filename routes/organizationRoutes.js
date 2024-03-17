const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The organization's ID.
 *         name:
 *           type: string
 *           description: The name of the organization.
 */

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     description: Create a new organization.
 *     requestBody:
 *       description: Organization data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to create organization
 *   get:
 *     summary: Get all organizations
 *     description: Retrieve a list of all organizations.
 *     responses:
 *       200:
 *         description: A list of organizations
 *       500:
 *         description: Failed to retrieve organizations
 */
router.post('/', organizationController.createOrganization);
router.get('/', organizationController.getAllOrganizations);

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     description: Retrieve organization information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Organization information
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Failed to retrieve organization
 *   put:
 *     summary: Update organization by ID
 *     description: Update organization information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Updated organization data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Failed to update organization
 */
router.get('/:id', organizationController.getOrganizationById);
router.put('/:id', organizationController.updateOrganization);

module.exports = router;
