const router = require('express').Router()
const Controller = require('../controllers/Controller')
const Validation = require('../middlewares/Validation')

router.post('/check-in', Validation.basicReqValidation, Controller.createTicket) 
router.post('/check-out', Validation.basicReqValidation, Controller.checkOutTicket)
router.post('/vehicle-count', Validation.basicReqValidation, Controller.readVehicleCount)
router.post('/vehicle-data', Validation.basicReqValidation, Controller.readVehicleByColor)

module.exports = router