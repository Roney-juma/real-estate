const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  propertyName: { type: String, required: true },      // Name of the property
  propertyNumber: { type: String, required: true },
  floor: { type: Number, required: true },
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  numRooms: { type: Number, required: true },
  status: { type: String, enum: ['occupied', 'vacant', 'maintenance'], required: true },
  rentAmount: { type: Number, required: true },
  size: { type: Number, required: true },
  leaseStart: { type: Date },
  leaseEnd: { type: Date },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: false },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  utilitiesIncluded: { type: Boolean, default: false },
  petFriendly: { type: Boolean, default: false },
  parkingAvailable: { type: Boolean, default: false },
  furnished: { type: Boolean, default: false },
  description: { type: String },
  amenities: { type: [String] },
  securityDeposit: { type: Number },
  leaseTerms: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Property', apartmentSchema);
