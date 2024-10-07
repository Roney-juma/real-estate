const tenantSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    employer: { type: String },
    apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
    leaseStart: { type: Date },
    leaseEnd: { type: Date },
    rentDueDate: { type: Number, required: true },
    rentAmount: { type: Number, required: true },
    paymentHistory: [{
      amount: Number,
      datePaid: Date,
      status: { type: String, enum: ['completed', 'pending', 'failed'] }
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Tenant', tenantSchema);
  