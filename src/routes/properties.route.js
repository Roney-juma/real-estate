const propertyController = require("../controller/properties.controller")
const express =require("express")
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post('/create',propertyController.addProperty)
// router.post('/login',propertyController.authenticateAdminUser)
// router.post('/reset-password', propertyController.resetPassword);
router.get('/',propertyController.getAllPropertys)
router.delete('/delete/:id', propertyController.deleteProperty)
router.get('/:id', propertyController.getPropertyById)
router.put('/:id',propertyController.updateProperty)
router.get('/getPropertysByLandlord/:id',propertyController.getPropertysByLandlord)


module.exports = router;