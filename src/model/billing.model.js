const mongoose = require('mongoose');


const billingSchema = new mongoose.Schema({
    apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    utilityType: { type: String, enum: ['electricity', 'water', 'internet'], required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue'], default: 'unpaid' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Billing', billingSchema);
  