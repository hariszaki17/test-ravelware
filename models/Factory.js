const { SUV, MPV } = require('./Vehicle');
const Ticket = require('./Ticket');
const ParkingLot = require('./ParkingLot');

class Factory {
    //only from fs for plain json
    static createVehicle(listVehicle) {
        let isArray = Array.isArray(listVehicle);
        !isArray ? listVehicle = [ listVehicle ] : null;
        let vehicles = [];
        listVehicle.forEach(el => {
            if (el._type === 'SUV') {
                vehicles.push(new SUV(el._policeNumber, el._color));
            } else if (el._type === 'MPV') {
                vehicles.push(new MPV(el._policeNumber, el._color));
            }
        })
        if (!isArray) {
            return vehicles[0]
        } else {
            return vehicles
        }
    }

    static createParkingLot(listParkingLot) {
        let isArray = Array.isArray(listParkingLot);
        !isArray ? listParkingLot = [ listParkingLot ] : null;
        let parkingLot = listParkingLot.map(el => {
            if (el._parkedVehicle) {
                return new ParkingLot(el._id, el._availability, this.createVehicle(el._parkedVehicle))
            } else {
                return new ParkingLot(el._id, el._availability)
            }
        })
        if (!isArray) {
            return parkingLot[0]
        } else {
            return parkingLot
        }
    }

    static createTicket(listTicket) {
        if (listTicket.length > 0) {
            let tickets = listTicket.map(el => new Ticket(this.createVehicle(el._vehicle), this.createParkingLot(el._parkingLot), el._checkIn, el._checkOut));
            return tickets;
        }
        return []
    }

    //outside fs for object
    static createSingleVehicle(data) {
        if (data.type === 'SUV') {
            return new SUV(data.policeNumber, data.color);
        } else if (data.type === 'MPV') {
            return new MPV(data.policeNumber, data.color);
        }
    }

    static createSingleTicket(data) {
        return new Ticket(this.createSingleVehicle(data.vehicle), this.createSingleParkingLot(data.parkingLot), data.checkIn, data.checkOut)
    }

    static createSingleParkingLot(data) {
        return new ParkingLot(data.id, data.availability, this.createSingleVehicle(data.parkedVehicle))
    }

}

module.exports = Factory