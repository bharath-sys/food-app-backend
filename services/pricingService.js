const Pricing = require('../models/Pricing');

// Service methods for pricing
function createPricing(organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) {
    return new Promise((resolve, reject) => {
        Pricing.create({ organization_id, item_id, zone, base_distance_in_km, km_price, fix_price })
            .then(newPricing => resolve(newPricing))
            .catch(error => reject(error));
    });
}

function getAllPricing() {
    return new Promise((resolve, reject) => {
        Pricing.findAll()
            .then(pricing => resolve(pricing))
            .catch(error => reject(error));
    });
}

function getPricingByOrganizationAndItem(organizationId, itemId) {
    return new Promise((resolve, reject) => {
        Pricing.findOne({ where: { organization_id: organizationId, item_id: itemId } })
            .then(pricing => resolve(pricing))
            .catch(error => reject(error));
    });
}

function updatePricing(organizationId, itemId, zone, base_distance_in_km, km_price, fix_price) {
    return new Promise((resolve, reject) => {
        Pricing.findOne({ where: { organization_id: organizationId, item_id: itemId } })
            .then(pricing => {
                if (!pricing) {
                    return reject(new Error('Pricing not found'));
                }
                pricing.zone = zone;
                pricing.base_distance_in_km = base_distance_in_km;
                pricing.km_price = km_price;
                pricing.fix_price = fix_price;
                return pricing.save();
            })
            .then(updatedPricing => resolve(updatedPricing))
            .catch(error => reject(error));
    });
}

module.exports = {
    createPricing,
    getAllPricing,
    getPricingByOrganizationAndItem,
    updatePricing
};
