const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }, // Payment date
    method: { type: String, enum: ['cash', 'bank transfer', 'credit card'], required: true },
    status: { type: String, enum: ['completed', 'pending', 'failed'], default: 'completed' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  