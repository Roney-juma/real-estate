const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    employer: { type: String, required: false }, // Optional
    apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
    leaseStart: { type: Date, required: false }, // Optional
    leaseEnd: { type: Date, required: false },   // Optional
    rentDueDate: { type: Number, required: true }, // The day of the month rent is due (e.g., 1st, 15th)
    rentAmount: { type: Number, required: true },  // Rent Amount in USD or other currency
    paymentHistory: [{
      amount: { type: Number, required: true },
      datePaid: { type: Date, required: true },
      status: { type: String, enum: ['completed', 'pending', 'failed'], default: 'pending' },
      paymentMethod: { type: String, enum: ['creditCard', 'bankTransfer', 'cash'], required: false }
    }],
    status: { type: String, enum: ['active', 'inactive', 'evicted'], default: 'active' }, // Tenant Status
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
