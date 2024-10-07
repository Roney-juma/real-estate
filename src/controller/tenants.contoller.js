const tenantService = require('../services/tenantService');

const createTenant = async (req, res) => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenantById = async (req, res) => {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTenant = async (req, res) => {
  try {
    const tenant = await tenantService.updateTenant(req.params.id, req.body);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTenant = async (req, res) => {
  try {
    await tenantService.deleteTenant(req.params.id);
    res.status(204).json({ message: 'Tenant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantService.getAllTenants();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenant,
  getAllTenants,
};
