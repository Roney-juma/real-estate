const Landlord = require('../model/landlord.model');
const Property = require('../model/properties.model');

// Create a new landlord and assign a unique landLordNumber
const createLandlord = async (landlordData) => {
  const landlordCount = await Landlord.countDocuments();
  const landLordNumber = `LD-${String(landlordCount + 1).padStart(4, '0')}`;
  landlordData.landLordNumber = landLordNumber;
  const landlord = new Landlord(landlordData);
  await landlord.save();
  return landlord;
};

// Get a landlord by ID, populating propertiesOwned and building details
const getLandlordById = async (landlordId) => {
  const landlord = await Landlord.findById(landlordId).populate({
    path: 'propertiesOwned',
    populate: {
      path: 'buildingId',
      select: 'name street city area'
    }
  });
  return landlord;
};

// Update a landlord’s information
const updateLandlord = async (landlordId, landlordData) => {
  return await Landlord.findByIdAndUpdate(landlordId, landlordData, { new: true });
};

// Delete a landlord by ID
const deleteLandlord = async (landlordId) => {
  return await Landlord.findByIdAndDelete(landlordId);
};

// Get all landlords, including a count of total landlords, propertiesOwned, and building details
const getAllLandlords = async () => {
  const totalLandlords = await Landlord.countDocuments();
  const landlords = await Landlord.find({}).populate({
    path: 'propertiesOwned',
    populate: {
      path: 'buildingId',
      select: 'name street city area'
    }
  });
  return { totalLandlords, landlords };
};

// Get performance statistics for each landlord, including total properties and average rent amount
const getLandlordPerformance = async () => {
  const result = await Property.aggregate([
    {
      $group: {
        _id: '$landlordId',
        totalProperties: { $sum: 1 },
        averageRent: { $avg: '$rentAmount' }
      }
    },
    {
      $lookup: {
        from: 'landlords',
        localField: '_id',
        foreignField: '_id',
        as: 'landlordDetails'
      }
    },
    {
      $unwind: '$landlordDetails'
    },
    {
      $project: {
        'landlordDetails.name': 1,
        'landlordDetails.email': 1,
        totalProperties: 1,
        averageRent: 1
      }
    }
  ]);
  return result;
};

// Get properties for a landlord by landlord ID, with detailed building information
const getPropertiesByLandlordId = async (landlordId) => {
  const properties = await Property.find({ landlordId }).populate({
    path: 'buildingId',
    select: 'name street city area'
  });
  return properties;
};

// Activate or suspend a landlord's account based on landlord ID and status type
const updateLandlordStatus = async (landlordId, status) => {
  if (!['active', 'suspended', 'deactivated'].includes(status)) {
    throw new Error('Invalid status');
  }
  return await Landlord.findByIdAndUpdate(landlordId, { accountStatus: status }, { new: true });
};

module.exports = {
  createLandlord,
  getLandlordById,
  updateLandlord,
  deleteLandlord,
  getAllLandlords,
  getLandlordPerformance,
  getPropertiesByLandlordId,
  updateLandlordStatus
};
