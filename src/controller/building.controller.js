const buildingService = require("../services/building.service")


// Add New Building
const createBuilding = async(req,res) => {
    try {
        const building = await buildingService.addBuilding(req.body)
        res.status(201).json(building)
        } catch (error) {
            res.status(500).json({message: error.message})
            }

}
// Get Building by ID
const getBuildingById = async(req,res) => {
    try {
        const building = await buildingService.getBuildingById(req.params.id)
        if(!building) {
            return res.status(404).json({message: "Building not found"})
            }
            res.json(building)
            } catch (error) {
                res.status(500).json({message: error.message})
                }
}
// Get All Buildings
const getAllBuildings = async(req,res) => {
    try {
        const buildings = await buildingService.getAllBuildings()
        res.json(buildings)
        } catch (error) {
            res.status(500).json({message: error.message})
            }
}
// Update Building
const updateBuilding = async(req,res) => {
    try {
        const building = await buildingService.updateBuilding(req.params.id, req.body)
        if(!building) {
            return res.status(404).json({message: "Building not found"})
            }
            res.json(building)
            } catch (error) {
                res.status(500).json({message: error.message})
                }

    };
// Delete Building
const deleteBuilding = async(req,res) => {
    try {
        await buildingService.deleteBuilding(req.params.id)
        res.status(204).json({message: "Building deleted"})
        } catch (error) {
            res.status(500).json({message: error.message})
            }
        };

// Buildings By Owner
const getBuildingsByOwner = async(req,res) => {
    try {
        const buildings = await buildingService.getBuildingsByOwner(req.params.ownerId)
        res.json(buildings)
        } catch (error) {
            res.status(500).json({message: error.message})
            }
    };
    // Buildings By Location
    const getBuildingsByLocation = async(req,res) => {
        try {
            const buildings = await buildingService.getBuildingsByLocation(req.params.location)
            res.json(buildings)
            } catch (error) {
                res.status(500).json({message: error.message})
                }
                };

   module.exports = {
                getAllBuildings,
                getBuildingById,
                 createBuilding,
                updateBuilding,
                deleteBuilding,
                getBuildingsByOwner,
                getBuildingsByLocation
            }
