const Organization = require('../models/Organization');

const createOrganization = async (name) => {
    return await Organization.create({ name });
};

const getAllOrganizations = async () => {
    return await Organization.findAll();
};

const getOrganizationById = async (id) => {
    return await Organization.findByPk(id);
};

const updateOrganization = async (id, name) => {
    const organization = await Organization.findByPk(id);
    if (organization) {
        organization.name = name;
        await organization.save();
    }
    return organization;
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization
};
