const landlordController = require("../controller/landlord.controller");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Create a new landlord
router.post('/create', landlordController.createLandlord);

// Get all landlords
router.get('/', landlordController.getAllLandlords);

// Get landlord by ID with populated properties and building info
router.get('/:id', landlordController.getLandlordById);

// Update a landlord's details
router.put('/:id', landlordController.updateLandlord);

// Delete a landlord by ID
router.delete('/:id', landlordController.deleteLandlord);

// Get properties owned by a specific landlord
router.get('/:id/properties', landlordController.getPropertiesByLandlordId);

// Update the account status of a landlord (active, suspended, deactivated)
router.patch('/status/:id', landlordController.updateLandlordStatus);

// Get performance metrics for landlords (average rent, total properties, etc.)
router.get('/performance/metrics', landlordController.getLandlordPerformance);

module.exports = router;
