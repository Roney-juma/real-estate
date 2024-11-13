const propertyController = require("../controller/properties.controller");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Add a new property
router.post('/create', propertyController.addProperty);

// Get all properties with optional pagination and filters
router.get('/', propertyController.getAllProperties);

// Get properties within a specific rent range
router.get('/rent-range', propertyController.getPropertiesByRentRange);

// Get a property by ID
router.get('/:id', propertyController.getPropertyById);

// Update a property by ID
router.put('/:id', propertyController.updateProperty);

// Delete a property by ID
router.delete('/:id', propertyController.deleteProperty);

// Get properties by landlord ID
router.get('/landlord/:landlordId', propertyController.getPropertiesByLandlord);

// Get properties by status (e.g., vacant, occupied)
router.get('/status/:status', propertyController.getPropertiesByStatus);

module.exports = router;
