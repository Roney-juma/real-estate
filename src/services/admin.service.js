const AdminUser = require('../model/admins.model');
const bcrypt = require('bcrypt');

const createAdminUser = async (adminUserData) => {
  const adminUser = new AdminUser(adminUserData);
  await adminUser.save();
  return adminUser;
};

const getAdminUserById = async (adminUserId) => {
  return await AdminUser.findById(adminUserId);
};

const updateAdminUser = async (adminUserId, adminUserData) => {
  return await AdminUser.findByIdAndUpdate(adminUserId, adminUserData, { new: true });
};

const deleteAdminUser = async (adminUserId) => {
  return await AdminUser.findByIdAndDelete(adminUserId);
};

const getAllAdminUsers = async () => {
  return await AdminUser.find({});
};

const authenticateAdminUser = async (email, password) => {
  const adminUser = await AdminUser.findOne({ email });
  if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
    return adminUser;
  } else {
    throw new Error('Invalid email or password');
  }
};

module.exports = {
  createAdminUser,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  getAllAdminUsers,
  authenticateAdminUser
};
