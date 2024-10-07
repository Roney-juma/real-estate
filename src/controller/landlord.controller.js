const landlordService = require('../services/landlordService');

const createLandlord = async (req, res) => {
  try {
    const landlord = await landlordService.createLandlord(req.body);
    res.status(201).json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLandlordById = async (req, res) => {
  try {
    const landlord = await landlordService.getLandlordById(req.params.id);
    if (!landlord) return res.status(404).json({ message: 'Landlord not found' });
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLandlord = async (req, res) => {
  try {
    const landlord = await landlordService.updateLandlord(req.params.id, req.body);
    if (!landlord) return res.status(404).json({ message: 'Landlord not found' });
    res.json(landlord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLandlord = async (req, res) => {
  try {
    await landlordService.deleteLandlord(req.params.id);
    res.status(204).json({ message: 'Landlord deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLandlords = async (req, res) => {
  try {
    const landlords = await landlordService.getAllLandlords();
    res.json(landlords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLandlord,
  getLandlordById,
  updateLandlord,
  deleteLandlord,
  getAllLandlords,
};
