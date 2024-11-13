const tenantController = require('../controller/tenants.contoller');
const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new tenant
router.post('/create', tenantController.createTenant);

// Get all tenants
router.get('/', tenantController.getAllTenants);

// Get tenant by ID
router.get('/:id', tenantController.getTenantById);

// Update tenant details
router.put('/:id', tenantController.updateTenant);

// Delete tenant
router.delete('/delete/:id', tenantController.deleteTenant);

// Get tenants by apartment ID
router.get('/apartment/:apartmentId', tenantController.getTenantsByApartmentId);

// Get tenants by landlord ID
router.get('/landlord/:landlordId', tenantController.getTenantsByLandlordId);

// Search tenants based on query
router.get('/search', tenantController.searchTenants);

// Get tenants by payment status (e.g., "paid", "unpaid")
router.get('/payment-status/:status', tenantController.getTenantsByPaymentStatus);

// Update payment history for a tenant
router.put('/:id/payment-history', tenantController.updatePaymentHistory);

// Update tenant status (e.g., active, inactive)
router.put('/:id/status', tenantController.updateTenantStatus);

// Get payment history for a specific tenant
router.get('/:id/payment-history', tenantController.getPaymentHistory);

// Check if rent is due for a tenant
router.get('/:id/rent-due', tenantController.checkRentDue);

// Calculate the total rent paid by a tenant
router.get('/:id/total-rent-paid', tenantController.calculateTotalRentPaid);

// Get tenants who are due for renewal
router.get('/due-for-renewal', tenantController.getTenantsDueForRenewal);
router.post('/:tenantId/payments', tenantController.addPayment);
router.get('/:tenantId/outstanding-balance', tenantController.checkOutstandingBalance);
router.get('/outstanding-payments', tenantController.getTenantsWithOutstandingPayments);
router.get('/due-today', tenantController.getTenantsDueForPaymentToday);



module.exports = router;
