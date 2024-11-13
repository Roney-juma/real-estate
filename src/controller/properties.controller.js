const propertyService = require('../services/properties.service');

// Add a new property
const addProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    const result = await propertyService.addNewProperty(propertyData);

    return res.status(201).json({
      message: 'Property added successfully',
      newProperty: result.newProperty,
      totalProperties: result.totalPropertiesAfter,
      percentageChange: result.percentageChange,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await propertyService.updateProperty(req.params.id, req.body);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.status(204).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties with optional pagination and filtering
const getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, minRent, maxRent } = req.query;

    const result = await propertyService.getProperties(
      parseInt(page),
      parseInt(limit),
      { status, minRent: parseFloat(minRent), maxRent: parseFloat(maxRent) }
    );

    res.status(200).json({
      result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by landlord ID
const getPropertiesByLandlord = async (req, res) => {
  try {
    const landlordId = req.params.landlordId;
    const properties = await propertyService.getPropertiesByLandlord(landlordId);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties by status
const getPropertiesByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const properties = await propertyService.getPropertiesByStatus(status);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get properties within a specific rent range
const getPropertiesByRentRange = async (req, res) => {
  try {
    const { minRent, maxRent } = req.query;
    const properties = await propertyService.getPropertiesByRentRange(
      parseFloat(minRent),
      parseFloat(maxRent)
    );
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertiesByLandlord,
  getPropertiesByStatus,
  getPropertiesByRentRange,
};
