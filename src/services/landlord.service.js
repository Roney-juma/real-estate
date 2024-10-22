const Landlord = require('../model/landlord.model');

const createLandlord = async (landlordData) => {
  const landlord = new Landlord(landlordData);
  await landlord.save();
  return landlord;
};

const getLandlordById = async (landlordId) => {
  return await Landlord.findById(landlordId);
};

const updateLandlord = async (landlordId, landlordData) => {
  return await Landlord.findByIdAndUpdate(landlordId, landlordData, { new: true });
};

const deleteLandlord = async (landlordId) => {
  return await Landlord.findByIdAndDelete(landlordId);
};

const getAllLandlords = async () => {
  return await Landlord.find({});
};
const getLandlordPerformance = async () => {
  const result = await Apartment.aggregate([
    {
      $group: {
        _id: '$landlordId',
        totalProperties: { $count: {} },
        averageRent: { $avg: '$rent' },
      },
    },
    {
      $lookup: {
        from: 'landlords',
        localField: '_id',
        foreignField: '_id',
        as: 'landlordDetails',
      },
    },
  ]);

  return result;
};



module.exports = {
  createLandlord,
  getLandlordById,
  updateLandlord,
  deleteLandlord,
  getAllLandlords,
  getLandlordPerformance
};
