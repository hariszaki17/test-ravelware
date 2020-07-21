const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.get('/', (req, res) => res.send('HELLO'))
router.post('/check-in', Controller.createTicket)
router.get('/check-out', (req, res) => res.send('HELLO'))
router.get('/vehicle-count', (req, res) => res.send('HELLO'))
router.get('/vehicle-data', (req, res) => res.send('HELLO'))

module.exports = router