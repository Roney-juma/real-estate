const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  apartmentNumber: { type: String, required: true },
  floor: { type: Number, required: true },
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  numRooms: { type: Number, required: true },
  status: { type: String, enum: ['occupied', 'vacant', 'maintenance'], required: true },
  rentAmount: { type: Number, required: true },
  size: { type: Number, required: true },
  leaseStart: { type: Date },
  leaseEnd: { type: Date },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Apartment', apartmentSchema);
