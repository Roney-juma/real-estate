const adminController = require("../controller/admin.contoller")
const express =require("express")
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();


router.post('/create',adminController.createAdminUser)
router.post('/login',adminController.authenticateAdminUser)
// router.post('/reset-password', adminController.resetPassword);
router.get('/',adminController.getAdminUsers)
router.delete('/delete/:id', adminController.deleteAdminUser)
router.get('/:id', adminController.getAdminUserById)
router.put('/:id',adminController.updateAdminUser)


module.exports = router;