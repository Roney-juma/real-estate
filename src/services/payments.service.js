// paymentService.js
const Payment = require('../model/payments.model');

const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
};

const getPaymentById = async (paymentId) => {
  return await Payment.findById(paymentId).populate('tenantId apartmentId');
};

const updatePayment = async (paymentId, paymentData) => {
  return await Payment.findByIdAndUpdate(paymentId, paymentData, { new: true });
};

const getPaymentsByTenant = async (tenantId) => {
  return await Payment.find({ tenantId }).populate('tenantId apartmentId');
};

const deletePayment = async (paymentId) => {
  return await Payment.findByIdAndDelete(paymentId);
};

const getAllPayments = async () => {
  return await Payment.find({}).populate('tenantId apartmentId');
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  getPaymentsByTenant,
  deletePayment,
  getAllPayments
};
