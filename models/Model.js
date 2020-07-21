const fs = require('fs');
const Factory = require('./Factory');
const { rejects } = require('assert');

class Model {
    static writeData(path, data) {
        fs.writeFileSync(path, data);
    }

    static readData(path) {
        let jsonList = fs.readFileSync(path, 'utf-8');
        let data = JSON.parse(jsonList);
        return data;
    }

    static vehicleExistValidation(vehicle) {
        let data = this.readData('./vehicles.json');
        let dataBase = Factory.createVehicle(data);
        return dataBase.some(el => {
            return el.policeNumber === vehicle.policeNumber;
        });
    }

    static parkingLotAvailabilityCheck() {
        let data = this.readData('./parking-lot.json');
        let dataBase = Factory.createParkingLot(data);
        console.log(dataBase)
        for (let i = 0; i < dataBase.length; i++) {
            if (dataBase[i].availability) {
                return dataBase[i];
            }
        }
        return false;
    }

    static inputCheckIn(data) {
        return new Promise((resolve, reject) => {
            let parkingLot = this.parkingLotAvailabilityCheck();
            console.log(parkingLot)
            if (parkingLot) {
                // jangan lupa kasih error udh penuh
                let newData = {
                    _policeNumber: data.platNomor,
                    _color: data.warna,
                    _type: data.tipe
                };
                let vehicle = Factory.createSingleVehicle(newData);
                console.log(vehicle, 'OKE OKE')
                if (!this.vehicleExistValidation(vehicle)) {
                    console.log('NAH LOH')
                    let vehicles = this.readData('./vehicles.json');
                    vehicles.push(vehicle);
                    this.writeData('./vehicles.json', JSON.stringify(vehicles, null, 2));
                }

                parkingLot.addVehicle(vehicle);
                let dBParkingLot = this.readData('./parking-lot.json');
                console.log(dBParkingLot, '<<<<<<<<<<<')
                let dataParkingLot = Factory.createParkingLot(dBParkingLot);
                for (let i = 0; i < dataParkingLot.length; i++) {
                    if (parkingLot.id === dataParkingLot[i].id) {
                        dataParkingLot[i] = parkingLot;
                        break;
                    }
                }
                this.writeData('./parking-lot.json', JSON.stringify(dataParkingLot, null, 2));

                console.log(vehicle, 'HOLAAA')
                let ticket = Factory.createSingleTicket({
                    _vehicle: vehicle, 
                    _parkingLot: parkingLot, 
                    _checkIn: new Date()
                });
                console.log(ticket, 'HAHAHAHAHAH')
                let dBTicket = this.readData('./parking-lot.json');
                // let dataTicket = Factory.createTicket(dBTicket);
                // dataTicket.push(ticket);
                // this.writeData('./ticket.json', JSON.stringify(dataTicket, null, 2));

                resolve({
                    platNomor: ticket.vehicle.policeNumber,
                    parkingLot: ticket.parkingLot.id,
                    tanggalMasuk: ticket.checkIn
                })
            }
        })
    }
}

module.exports = Model