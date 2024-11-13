const tenantService = require('../services/tenants.service');

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tenants = await tenantService.getAllTenants(page, limit);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenantsByApartmentId = async (req, res) => {
  try {
    const tenants = await tenantService.getTenantsByApartmentId(req.params.apartmentId);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenantsByLandlordId = async (req, res) => {
  try {
    const tenants = await tenantService.getTenantsByLandlordId(req.params.landlordId);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTenants = async (req, res) => {
  try {
    const tenants = await tenantService.searchTenants(req.query.searchQuery);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenantsByPaymentStatus = async (req, res) => {
  try {
    const tenants = await tenantService.getTenantsByPaymentStatus(req.params.status);
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentHistory = async (req, res) => {
  try {
    const tenant = await tenantService.updatePaymentHistory(req.params.id, req.body);
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTenantStatus = async (req, res) => {
  try {
    const tenant = await tenantService.updateTenantStatus(req.params.id, req.body.status);
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await tenantService.getPaymentHistory(req.params.id);
    res.json(paymentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkRentDue = async (req, res) => {
  try {
    const isDue = await tenantService.checkRentDue(req.params.id);
    res.json({ rentDue: isDue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateTotalRentPaid = async (req, res) => {
  try {
    const totalPaid = await tenantService.calculateTotalRentPaid(req.params.id);
    res.json({ totalPaid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenantsDueForRenewal = async (req, res) => {
  try {
    const tenants = await tenantService.getTenantsDueForRenewal();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a payment for a tenant
const addPayment = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const paymentData = req.body;
    const tenant = await tenantService.addPayment(tenantId, paymentData);
    res.status(201).json({ message: 'Payment added successfully', tenant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check outstanding balance for a tenant
const checkOutstandingBalance = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const { totalRentDue } = req.query; // Assume totalRentDue is passed in query
    const balanceDue = await tenantService.checkOutstandingBalance(tenantId, parseFloat(totalRentDue));
    res.json({ tenantId, balanceDue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tenants with outstanding payments
const getTenantsWithOutstandingPayments = async (req, res) => {
  try {
    const tenants = await tenantService.getTenantsWithOutstandingPayments();
    res.json({ tenants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tenants due for payment today
const getTenantsDueForPaymentToday = async (req, res) => {
  try {
    const tenantsDueToday = await tenantService.getTenantsDueForPaymentToday();
    res.json({ tenantsDueToday });
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
  getTenantsByApartmentId,
  getTenantsByLandlordId,
  searchTenants,
  getTenantsByPaymentStatus,
  updatePaymentHistory,
  updateTenantStatus,
  getPaymentHistory,
  checkRentDue,
  calculateTotalRentPaid,
  getTenantsDueForRenewal,
  getTenantsDueForPaymentToday,
  getTenantsWithOutstandingPayments,
  checkOutstandingBalance,
  addPayment
};
