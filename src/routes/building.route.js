const express = require('express');
const router = express.Router();
const buildingController = require('../controller/building.controller');


router.post('/create', buildingController.createBuilding);
router.get('/:id', buildingController.getBuildingById);
router.get('/', buildingController.getAllBuildings);
router.put('/:id', buildingController.updateBuilding);
router.delete('/:id', buildingController.deleteBuilding);
router.get('/owner/:ownerId', buildingController.getBuildingsByOwner);
router.get('/location/:location', buildingController.getBuildingsByLocation);

module.exports = router;
