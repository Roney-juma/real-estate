const express =require("express")

const admins = require("./admin.route")
const landlords = require("./landlord.route")
const properties = require("./properties.route")
const tenants = require("./tenants.route")
const payments = require("./payments.route")
const billing = require("./billing.route")
const buildings = require("./building.route")

const router = express.Router()


router.use("/admins", admins)
router.use("/landlords", landlords)
router.use("/properties", properties)
router.use("/tenants", tenants)
router.use("/payments", payments)
router.use("/billing", billing)
router.use("/buildings", buildings)


module.exports  = router