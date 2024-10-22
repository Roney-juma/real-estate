const propertyController = require("../controller/properties.controller")
const express =require("express")
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.post('/create',propertyController.addApartment)
// router.post('/login',propertyController.authenticateAdminUser)
// router.post('/reset-password', propertyController.resetPassword);
router.get('/',propertyController.getAllApartments)
router.delete('/delete/:id', propertyController.deleteApartment)
router.get('/:id', propertyController.getApartmentById)
router.put('/:id',propertyController.updateApartment)
router.get('/getApartmentsByLandlord/:id',propertyController.getApartmentsByLandlord)


module.exports = router;