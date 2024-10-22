const landlordController = require("../controller/landlord.controller")
const express =require("express")
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.post('/create',landlordController.createLandlord)
// router.post('/login',landlordController.authenticateAdminUser)
// router.post('/reset-password', landlordController.resetPassword);
router.get('/',landlordController.getAllLandlords)
router.delete('/delete/:id', landlordController.deleteLandlord)
router.get('/:id', landlordController.getLandlordById)
router.put('/:id',landlordController.updateLandlord)


module.exports = router;