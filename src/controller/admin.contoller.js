const adminUserService = require('../services/admin.service');

const createAdminUser = async (req, res) => {
  try {
    const adminUser = await adminUserService.createAdminUser(req.body);
    res.status(201).json(adminUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Admin Users
const getAdminUsers = async (req, res) => {
  try {
    const adminUsers = await adminUserService.getAllAdminUsers();
    res.status(200).json(adminUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
      }
    };

const getAdminUserById = async (req, res) => {
  try {
    const adminUser = await adminUserService.getAdminUserById(req.params.id);
    if (!adminUser) return res.status(404).json({ message: 'Admin User not found' });
    res.json(adminUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdminUser = async (req, res) => {
  try {
    const adminUser = await adminUserService.updateAdminUser(req.params.id, req.body);
    if (!adminUser) return res.status(404).json({ message: 'Admin User not found' });
    res.json(adminUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    await adminUserService.deleteAdminUser(req.params.id);
    res.status(204).json({ message: 'Admin User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authenticateAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminUser = await adminUserService.authenticateAdminUser(email, password);
    if (!adminUser) return res.status(401).json({ message: 'Invalid credentials' });
    res.json(adminUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdminUser,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  authenticateAdminUser,
};
