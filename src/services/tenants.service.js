const Tenant = require('../models/Tenant');

const createTenant = async (tenantData) => {
  const tenant = new Tenant(tenantData);
  await tenant.save();
  return tenant;
};

const getTenantById = async (tenantId) => {
  return await Tenant.findById(tenantId);
};

const updateTenant = async (tenantId, tenantData) => {
  return await Tenant.findByIdAndUpdate(tenantId, tenantData, { new: true });
};

const deleteTenant = async (tenantId) => {
  return await Tenant.findByIdAndDelete(tenantId);
};

const getAllTenants = async () => {
  return await Tenant.find({});
};

module.exports = {
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenant,
  getAllTenants
};
