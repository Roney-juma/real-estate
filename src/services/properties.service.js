const Property = require('../model/properties.model');
const cache = require('memory-cache');

const getTotalPropertys = async () => {

  let totalPropertys = cache.get('totalPropertys');
  
  if (totalPropertys === null) {
   
    totalPropertys = await Property.countDocuments();
    
    cache.put('totalPropertys', totalPropertys, 36000);
  }

  return totalPropertys;
};

const addNewProperty = async (propertyData) => {
  try {
    const totalPropertysBefore = await getTotalPropertys();
    const propertyCount = await Property.countDocuments();
  const propertyNumber = `PR-${String(propertyCount + 1).padStart(4, '0')}`;
  propertyData.propertyNumber = propertyNumber;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    cache.put('totalPropertys', totalPropertysBefore + 1, 3600000);

    const totalPropertysAfter = totalPropertysBefore + 1;

    let percentageChange = 0;
    if (totalPropertysBefore > 0) {
      percentageChange = ((totalPropertysAfter - totalPropertysBefore) / totalPropertysBefore) * 100;
    }

    return {
      newProperty,
      totalPropertysAfter,
      percentageChange: percentageChange.toFixed(2) + '%', // rounding to two decimal places
    };
  } catch (error) {
    throw new Error('Error adding new Property: ' + error.message);
  }
};


const getPropertyById = async (PropertyId) => {
  return await Property.findById(PropertyId);
};
const getProperty = async (PropertyId) => {
  return await Property.find({});
};

const updateProperty = async (PropertyId, PropertyData) => {
  return await Property.findByIdAndUpdate(PropertyId, PropertyData, { new: true });
};

const deleteProperty = async (PropertyId) => {
  return await Property.findByIdAndDelete(PropertyId);
};

const getPropertiesByLandlord = async (landlordId) => {
  try {
    const properties = await Property.find({ landlordId });
    return properties;
  } catch (error) {
    throw new Error('Error fetching properties for landlord: ' + error.message);
  }
};

module.exports = {
  addNewProperty,
  getTotalPropertys,
  getProperty,
  getPropertyById,
  updateProperty,
  getPropertiesByLandlord,
  deleteProperty,
};
