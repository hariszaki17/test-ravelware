const { SUV, MPV } = require('./Vehicle');
const Ticket = require('./Ticket');
const ParkingLot = require('./ParkingLot');

class Factory {
    static createVehicle(listVehicle) {
        let vehicles = [];
        listVehicle.forEach(el => {
            if (el.type === 'SUV') {
                vehicles.push(new SUV(el._policeNumber, el._color));
            } else if (el.type === 'MPV') {
                vehicles.push(new MPV(el._policeNumber, el._color));
            }
        })
        return vehicles;
    }

    static createSingleVehicle(data) {
        if (data._type === 'SUV') {
            return new SUV(data._policeNumber, data._color);
        } else if (data._type === 'MPV') {
            return new MPV(data._policeNumber, data._color);
        } else if (data.type === 'SUV') {
            return new SUV(data.policeNumber, data.color);
        } else if (data.type === 'MPV') {
            return new MPV(data.policeNumber, data.color);
        }
    }

    static createSingleTicket(data) {
        return new Ticket(this.createSingleVehicle(data._vehicle), this.createSingleParkingLot(data._parkingLot), data._checkIn, data._checkOut)
    }

    static createSingleParkingLot(data) {
        return new ParkingLot(data._id, data._availability, this.createSingleVehicle(data._parkedVehicle))
    }

    static createParkingLot(listParkingLot) {
        let parkingLot = listParkingLot.map(el => {
            if (el._parkedVehicle) {
                return new ParkingLot(el._id, el._availability, this.createSingleVehicle(el._parkedVehicle))
            } else {
                return new ParkingLot(el._id, el._availability)
            }
        })
        console.log(parkingLot)
        return parkingLot;
    }

    static createTicket(listTicket) {
        if (listTicket[0]) {
            let tickets = listTicket.map(el => new Ticket(this.createSingleVehicle(el._vehicle), this.createParkingLot(el._parkingLot), el._checkIn, el._checkOut));
            return tickets;
        }
        return []
    }
}

module.exports = Factory