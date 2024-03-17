const organizationService = require('../services/organizationService');

const createOrganization = async (req, res) => {
    try {
        const { name } = req.body;
        const organization = await organizationService.createOrganization(name);
        res.status(201).json(organization);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create organization' });
    }
};

const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await organizationService.getAllOrganizations();
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch organizations' });
    }
};

const getOrganizationById = async (req, res) => {
    const id = req.params.id;
    try {
        const organization = await organizationService.getOrganizationById(id);
        if (organization) {
            res.json(organization);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch organization' });
    }
};

const updateOrganization = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const organization = await organizationService.updateOrganization(id, name);
        if (organization) {
            res.json(organization);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update organization' });
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization
};
