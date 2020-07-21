const moment = require('moment')

class Ticket {
    constructor(vehicle, parkingLot, checkIn, checkOut) {
        this._vehicle = vehicle;
        this._parkingLot = parkingLot;
        this._policeNumber = this._vehicle.policeNumber;
        this._parkingLotID = this._parkingLot.id;
        this._checkIn = checkIn;
        this._checkOut = checkOut || null;
        this._hourlyCost = this._vehicle.baseCost / 5;
        this._totalCost = this.calculateTotalCost();
    }

    calculateTotalCost(checkOut) {
        if (this._checkOut) {
            const duration = moment.duration(checkOut.diff(checkIn)).asHours();
            if (duration <= 1) {
                return this._vehicle.baseCost;
            } else {
                let result = this._vehicle.baseCost;
                result += ((duration-1) * this._hourlyCost);
                return result;
            }
        } else {
            return this._vehicle.baseCost;
        }
    }

    checkingOut() {
        this._checkOut = new Date();
        this._totalCost = this.calculateTotalCost();
    }
}

module.exports = Ticket;