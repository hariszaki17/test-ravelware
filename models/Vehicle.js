class Vehicle {
    constructor(policeNumber, color, type, baseCost) {
        this._policeNumber = policeNumber;
        this._color = color;
        this._type = type;
        this._baseCost = baseCost;
    }

    get policeNumber() {
        return this._policeNumber;
    }

    get color() {
        return this._color;
    }

    get type() {
        return this._type;
    }

    get baseCost() {
        return this._baseCost;
    }

}

class SUV extends Vehicle {
    constructor(policeNumber, color) {
        super(policeNumber, color, 'SUV', 15000)
    }
}

class MPV extends Vehicle {
    constructor(policeNumber, color) {
        super(policeNumber, color, 'MPV', 20000)
    }
}

module.exports = { Vehicle, SUV, MPV }