const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post('/check-in', Controller.createTicket)
router.post('/check-out', Controller.checkOutTicket)
router.post('/vehicle-count', Controller.readVehicleCount)
router.post('/vehicle-data', Controller.readVehicleByColor)

module.exports = router