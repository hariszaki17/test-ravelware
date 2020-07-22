const _ = require('lodash');
class Validation {
    static basicReqValidation(req, res, next) {
        const data = req.body;
        const route = req.route.path
        let properKeys;
        let keys = Object.keys(data);

        if (route === '/check-in') {
            properKeys = ['platNomor', 'warna', 'tipe'];
        } else if (route === '/check-out') {
            properKeys = ['platNomor']
        } else if (route === '/vehicle-count') {
            properKeys = ['tipe']
        } else if (route === '/vehicle-data') {
            properKeys = ['warna']
        } 
        
        const result = _.isEqual(properKeys.sort(), keys.sort());
        if (result) {
            const isAllTrue = Object.values(data).every(el => { return el })
            if (isAllTrue) {
                return next()
            } else {
                return next({
                    name: 'BadRequest',
                    errors: [{ message: 'All object properties cannot be null' }]
                })
            }
        } else {
            return next({
                name: 'BadRequest',
                errors: [{ message: 'Invalid object properties' }]
            })
        }
    }
    
}

module.exports = Validation;