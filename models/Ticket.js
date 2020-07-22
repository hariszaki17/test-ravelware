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

    get vehicle() {
        return this._vehicle;
    }

    get parkingLot() {
        return this._parkingLot;
    }

    get policeNumber() {
        return this._policeNumber;
    }

    get parkingLotID() {
        return this._parkingLotID;
    }

    get checkIn() {
        return this._checkIn;
    }

    get checkOut() {
        return this._checkOut;
    }

    get hourlyCost() {
        return this._hourlyCost;
    }

    get totalCost() {
        return this._totalCost;
    }

    isDate(date) {
        
    }

    calculateTotalCost() {
        if (this._checkOut) {
            const duration = moment.duration(moment(this._checkOut).diff(moment(this._checkIn))).asHours();
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