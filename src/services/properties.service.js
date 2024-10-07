const Apartment = require('../models/Apartment');
const cache = require('memory-cache');

const getTotalApartments = async () => {

  let totalApartments = cache.get('totalApartments');
  
  if (totalApartments === null) {
   
    totalApartments = await Apartment.countDocuments();
    
    cache.put('totalApartments', totalApartments, 36000);
  }

  return totalApartments;
};

const addNewApartment = async (apartmentData) => {
  try {
    const totalApartmentsBefore = await getTotalApartments();

    const newApartment = new Apartment(apartmentData);
    await newApartment.save();

    cache.put('totalApartments', totalApartmentsBefore + 1, 3600000);

    const totalApartmentsAfter = totalApartmentsBefore + 1;

    let percentageChange = 0;
    if (totalApartmentsBefore > 0) {
      percentageChange = ((totalApartmentsAfter - totalApartmentsBefore) / totalApartmentsBefore) * 100;
    }

    return {
      newApartment,
      totalApartmentsAfter,
      percentageChange: percentageChange.toFixed(2) + '%', // rounding to two decimal places
    };
  } catch (error) {
    throw new Error('Error adding new apartment: ' + error.message);
  }
};


const getApartmentById = async (apartmentId) => {
  return await Apartment.findById(apartmentId);
};

const updateApartment = async (apartmentId, apartmentData) => {
  return await Apartment.findByIdAndUpdate(apartmentId, apartmentData, { new: true });
};

const deleteApartment = async (apartmentId) => {
  return await Apartment.findByIdAndDelete(apartmentId);
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
  addNewApartment,
  getTotalApartments,
  getApartmentById,
  updateApartment,
  getPropertiesByLandlord,
  deleteApartment,
};
