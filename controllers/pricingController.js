const pricingService = require('../services/pricingService.js');
const { validationResult } = require('express-validator');

// Controller methods for pricing
const Pricing = require('../models/Pricing');

async function calculatePrice(req, res) {
    
    try {
        // Fetch pricing data from the database based on the provided parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { zone, organization_id, total_distance, item_type } = req?.body;
        const pricing = await Pricing.findOne({
            where: {
                organization_id:Number(organization_id),
                zone
            }
        });

        if (!pricing) {
            return res.status(404).json({ error: 'Pricing not found for given details.' });
        }

        // Calculate total price based on pricing data and total distance
        let totalPrice = pricing.fix_price;
        if (total_distance > pricing.base_distance_in_km) {
            const additionalDistance = total_distance - pricing.base_distance_in_km;
            const kmPrice = item_type === 'perishable' ?  Number(pricing.km_price.split("/")?.[0] || 0) : Number(pricing.km_price.split("/")?.[1] || 0);
            totalPrice += additionalDistance * kmPrice;
            totalPrice*=100; // converting into cents
        }

        // Format and send the response
        res.json({ total_price: totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to calculate price', message: error.message });
    }
}

async function createPricing(req, res) {
    try {
        const { organization_id, item_id, zone, base_distance_in_km, km_price, fix_price } = req.body;
        const newPricing = await pricingService.createPricing(organization_id, item_id, zone, base_distance_in_km, km_price, fix_price);
        res.status(201).json(newPricing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create pricing', message: error.message });
    }
}

async function getAllPricing(req, res) {
    try {
        const pricing = await pricingService.getAllPricing();
        res.json(pricing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch pricing', message: error.message });
    }
}

async function getPricingByOrganizationAndItem(req, res) {
    const { organizationId, itemId } = req.params;
    try {
        const pricing = await pricingService.getPricingByOrganizationAndItem(organizationId, itemId);
        if (pricing) {
            res.json(pricing);
        } else {
            res.status(404).json({ error: 'Pricing not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch pricing', message: error.message });
    }
}

async function updatePricing(req, res) {
    const { organizationId, itemId } = req.params;
    const { zone, base_distance_in_km, km_price, fix_price } = req.body;
    try {
        const updatedPricing = await pricingService.updatePricing(organizationId, itemId, zone, base_distance_in_km, km_price, fix_price);
        if (updatedPricing) {
            res.json(updatedPricing);
        } else {
            res.status(404).json({ error: 'Pricing not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update pricing', message: error.message });
    }
}

module.exports = {
    createPricing,
    calculatePrice,
    getAllPricing,
    getPricingByOrganizationAndItem,
    updatePricing
};
