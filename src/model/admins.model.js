const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const adminUserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['superadmin', 'admin'], 
    default: 'admin' 
  },
  password: { type: String, required: true },
  department: { type: String },
  position: { type: String },
  active: { type: Boolean, default: true },
  lastLogin: { type: Date },
  permissions: [{
    module: { type: String }, 
    canView: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false }
  }],
  profilePictureUrl: { type: String }, 
}, { timestamps: true });

adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('AdminUser', adminUserSchema);
