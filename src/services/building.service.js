const Building = require("../model/building.model")

// Add new Building
const addBuilding = async (buildingData) => {
    const building = new Building(buildingData);
    await building.save();
    return building;
  };
//  Get a Building by ID
  const getBuildingById = async (buildingId) => {
    const building = await Building.findById(buildingId);
    if (!building) {
      throw new Error('Building not found');
    }
    return building;
  };
//    Get All Buildings
  
const getAllBuildings = async (filters = {}) => {
  try {
    // Fetch the current number of buildings
    const currentBuildingCount = await Building.countDocuments(filters);

    // Fetch buildings from 5 minutes ago
    const dateFiveMinutesAgo = new Date();
    dateFiveMinutesAgo.setMinutes(dateFiveMinutesAgo.getMinutes() - 5); // Subtract 5 minutes from current time

    const buildingsFiveMinutesAgo = await Building.find({
      createdAt: { $lte: dateFiveMinutesAgo },
      ...filters, // Apply any additional filters (if provided)
    }).countDocuments();

    // Calculate the percentage rate of change
    const percentageChange = buildingsFiveMinutesAgo === 0
      ? 0 // Avoid division by zero if no buildings were created 5 minutes ago
      : ((currentBuildingCount - buildingsFiveMinutesAgo) / currentBuildingCount) * 100;

    // Fetch the buildings based on the filters
    const buildings = await Building.find(filters);

    return {
      buildings,
      percentageChange,
      currentBuildingCount,
      buildingsFiveMinutesAgo,
    };
  } catch (error) {
    throw new Error(`Error retrieving buildings: ${error.message}`);
  }
};
// Update a Building
  const updateBuilding = async (buildingId, updateData) => {
    const updatedBuilding = await Building.findByIdAndUpdate(buildingId, updateData, { new: true });
    if (!updatedBuilding) {
      throw new Error('Building not found');
    }
    return updatedBuilding;
  };

// Delete a Building

  const deleteBuilding = async (buildingId) => {
    const deletedBuilding = await Building.findByIdAndDelete(buildingId);
    if (!deletedBuilding) {
      throw new Error('Building not found');
    }
    return deletedBuilding;
  };
//   5. Get Buildings by Owner
  const getBuildingsByOwner = async (ownerId) => {
    const buildings = await Building.find({ owner: ownerId });
    return buildings;
  };
//   6. Get Buildings by City
  const getBuildingsByCity = async (city) => {
    const buildings = await Building.find({ city });
    return buildings;
  };
//   Search Buildings by Name
  const searchBuildingsByName = async (name) => {
    const buildings = await Building.find({ name: new RegExp(name, 'i') });
    return buildings;
  };
  module.exports = {
    addBuilding,
    getBuildingById,
    getAllBuildings,
    updateBuilding,
    deleteBuilding,
    getBuildingsByOwner,
    getBuildingsByCity,
    searchBuildingsByName
  };

