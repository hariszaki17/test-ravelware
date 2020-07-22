const Model = require('../models/Model')

class Controller {
    static createTicket (req, res, next) {
        console.log(req.body)
        Model.inputCheckIn(req.body)
        .then(result => {
            if (result.name === 'OutOfSpace') {
                return res.status(200).json(result)
            } else {
                return res.status(201).json(result)
            }
        })
        .catch(err => {
            return next(err)
        })
    }

    static checkOutTicket (req, res, next) {
        Model.inputCheckOut(req.body)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return next(err)
        })
    }

    static readVehicleCount (req, res) {
        Model.queryVehicleCount(req.body)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static readVehicleByColor (req, res) {
        Model.queryVehicleByColor(req.body)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = Controller;