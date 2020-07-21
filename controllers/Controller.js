const Model = require('../models/Model')

class Controller {
    static createTicket (req, res) {
        console.log(req.body)
        Model.inputCheckIn(req.body)
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = Controller;