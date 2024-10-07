// billingController.js
const billingService = require('../services/billingService');

const createBill = async (req, res) => {
  try {
    const bill = await billingService.createBill(req.body);
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBillById = async (req, res) => {
  try {
    const bill = await billingService.getBillById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBills = async (req, res) => {
  try {
    const bills = await billingService.getAllBills();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBill = async (req, res) => {
  try {
    const bill = await billingService.updateBill(req.params.id, req.body);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBill = async (req, res) => {
  try {
    await billingService.deleteBill(req.params.id);
    res.status(204).json({ message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBillsByTenant = async (req, res) => {
  try {
    const bills = await billingService.getBillsByTenant(req.params.tenantId);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOutstandingBills = async (req, res) => {
  try {
    const bills = await billingService.getOutstandingBills();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendBillToTenant = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    const bill = await billingService.sendBillToTenant(tenantId, req.body);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBill,
  getBillById,
  getAllBills,
  updateBill,
  deleteBill,
  getBillsByTenant,
  getOutstandingBills,
  sendBillToTenant,
};
