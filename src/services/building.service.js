const Building = require("../model/building.model")

// Add new Building
const newBuilding = async (buildingData) => {
    const building = new Building(buildingData);
    await building.save();
    return building;
  };

// Get All Buildings
const getAllBuildings = async () => {
    const buildings = await Building.find().populate("owner");
    return buildings;
};
// Get Building by ID
const getBuildingById = async (id) => {
    const building = await Building.findById(id).populate("owner");
    return building;
    };


