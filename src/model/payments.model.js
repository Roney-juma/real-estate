const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    amount: { type: Number, required: true },
    datePaid: { type: Date, required: true },
    paymentMethod: { type: String, enum: ['bank_transfer', 'credit_card'], required: true },
    status: { type: String, enum: ['completed', 'pending', 'failed'], required: true }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  