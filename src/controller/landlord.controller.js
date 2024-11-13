const landlordService = require('../services/landlord.service');

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

// Get properties owned by a specific landlord
const getPropertiesByLandlordId = async (req, res) => {
  try {
    const properties = await landlordService.getPropertiesByLandlordId(req.params.id);
    if (!properties.length) return res.status(404).json({ message: 'No properties found for this landlord' });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the account status of a landlord
const updateLandlordStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const landlord = await landlordService.updateLandlordStatus(req.params.id, status);
    if (!landlord) return res.status(404).json({ message: 'Landlord not found' });
    res.json({ message: `Landlord status updated to ${status}`, landlord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get landlord performance details (e.g., average rent and property count)
const getLandlordPerformance = async (req, res) => {
  try {
    const performanceData = await landlordService.getLandlordPerformance();
    res.json(performanceData);
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
  getPropertiesByLandlordId,
  updateLandlordStatus,
  getLandlordPerformance,
};
