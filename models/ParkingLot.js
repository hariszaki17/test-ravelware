class ParkingLot {
    constructor(id, availability, parkedVehicle) {
        this._id = id;
        this._availability = availability;
        this._parkedVehicle = parkedVehicle || null;
    }

    get id() {
        return this._id;
    }

    get availability() {
        return this._availability;
    }

    get parkedVehicle() {
        return this._parkedVehicle;
    }

    addVehicle(value) {
        this._parkedVehicle = value;
        this._availability = false;
    }
    
    removeVehicle() {
        this._parkedVehicle = null;
        this._availability = true;
    }
}

module.exports = ParkingLot;