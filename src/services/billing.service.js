const UtilityBilling = require('../model/billing.model');

const createUtilityBill = async (billData) => {
  const bill = new UtilityBilling(billData);
  await bill.save();
  return bill;
};

const getBillById = async (billId) => {
  return await UtilityBilling.findById(billId).populate('tenantId apartmentId');
};

const updateBillStatus = async (billId, status) => {
  return await UtilityBilling.findByIdAndUpdate(billId, { status }, { new: true });
};

const getBillsByTenant = async (tenantId) => {
  return await UtilityBilling.find({ tenantId }).populate('tenantId apartmentId');
};

module.exports = {
  createUtilityBill,
  getBillById,
  updateBillStatus,
  getBillsByTenant
};
