const propertyService = require('../services/properties.service');

const addProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    
    const result = await propertyService.addNewProperty(propertyData);

    return res.status(201).json({
      message: 'Property added successfully',
      newProperty: result.newProperty,
      totalPropertys: result.totalPropertysAfter,
      percentageChange: result.percentageChange,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getPropertyById = async (req, res) => {
  try {
    const Property = await propertyService.getPropertyById(req.params.id);
    if (!Property) return res.status(404).json({ message: 'Property not found' });
    res.json(Property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const Property = await propertyService.updateProperty(req.params.id, req.body);
    if (!Property) return res.status(404).json({ message: 'Property not found' });
    res.json(Property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.status(204).json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPropertys = async (req, res) => {
  try {
    const property = await propertyService.getProperty();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPropertysByLandlord = async (req, res) => {
    try {
      const landlordId = req.params.landlordId;
      const Propertys = await propertyService.getPropertysByLandlord(landlordId);
      return res.status(200).json(Propertys);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  addProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getAllPropertys,
  getPropertysByLandlord
};
