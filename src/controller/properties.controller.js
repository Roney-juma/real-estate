const apartmentService = require('../services/properties.service');

const addApartment = async (req, res) => {
  try {
    const apartmentData = req.body;
    
    const result = await apartmentService.addNewApartment(apartmentData);

    return res.status(201).json({
      message: 'Apartment added successfully',
      newApartment: result.newApartment,
      totalApartments: result.totalApartmentsAfter,
      percentageChange: result.percentageChange,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getApartmentById = async (req, res) => {
  try {
    const apartment = await apartmentService.getApartmentById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApartment = async (req, res) => {
  try {
    const apartment = await apartmentService.updateApartment(req.params.id, req.body);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApartment = async (req, res) => {
  try {
    await apartmentService.deleteApartment(req.params.id);
    res.status(204).json({ message: 'Apartment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllApartments = async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getApartmentsByLandlord = async (req, res) => {
    try {
      const landlordId = req.params.landlordId;
      const apartments = await apartmentService.getApartmentsByLandlord(landlordId);
      return res.status(200).json(apartments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  addApartment,
  getApartmentById,
  updateApartment,
  deleteApartment,
  getAllApartments,
  getApartmentsByLandlord
};
