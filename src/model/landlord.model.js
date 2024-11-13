const mongoose = require('mongoose');



const landlordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentDetails: { type: Object, required: true },
  apartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
  propertiesOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  identification: {
    type: String,
    required: true,
    enum: ['Passport', 'Driver\'s License', 'National ID'], // Identification type
  },
  landLordNumber: { type: String, required: true, unique: true },
  accountStatus: { type: String, default: 'active', enum: ['active', 'suspended', 'deactivated'] },
  notes: { type: String }, // Any additional notes about the landlord
  createdAt: { type: Date, default: Date.now }, // Optional override for automatic timestamp
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

  
  module.exports = mongoose.model('Landlord', landlordSchema);
  