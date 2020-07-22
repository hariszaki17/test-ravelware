const Factory = require('./Factory');
const File = require('./File')
const moment = require('moment');

class Model {
    static checkOutSearchValidation(dataTicket, data) {
        const searchedTicket = dataTicket.filter(el => { return el.policeNumber === data.platNomor.toUpperCase() && el.checkOut == null })[0];
        if (searchedTicket) {
            return searchedTicket
        } else {
            return false
        }
    }

    static typeValidation(data) {
        if (data.tipe === 'SUV' || data.tipe === 'MPV') {
            return true
        } else {
            return false
        }
    }

    static vehicleExistValidation(vehicle) {
        const fs = new File()
        let data = fs.fileRead('./vehicles.json');
        let dataBase = Factory.createVehicle(data);
        return dataBase.some(el => {
            return el.policeNumber === vehicle.policeNumber;
        });
    }

    static parkingLotAvailabilityCheck() {
        const fs = new File()
        let data = fs.fileRead('./parking-lot.json');
        let dataBase = Factory.createParkingLot(data);
        for (let i = 0; i < dataBase.length; i++) {
            if (dataBase[i].availability) {
                return dataBase[i];
            }
        }
        return false;
    }

    //Main Models
    static inputCheckIn(data) {
        return new Promise((resolve, reject) => {
            const fs = new File()
            let parkingLot = this.parkingLotAvailabilityCheck();
            if (this.typeValidation(data)) {
                if (parkingLot) {
                    let newData = {
                        policeNumber: data.platNomor,
                        color: data.warna,
                        type: data.tipe
                    };
                    let vehicle = Factory.createSingleVehicle(newData);
                    if (!this.vehicleExistValidation(vehicle)) {
                        let vehicles = fs.fileRead('./vehicles.json');
                        vehicles.push(vehicle);
                        fs.fileWrite('./vehicles.json', JSON.stringify(vehicles, null, 2));
                    }

                    parkingLot.addVehicle(vehicle);
                    let dBParkingLot = fs.fileRead('./parking-lot.json');
                    let dataParkingLot = Factory.createParkingLot(dBParkingLot);
                    for (let i = 0; i < dataParkingLot.length; i++) {
                        if (parkingLot.id === dataParkingLot[i].id) {
                            dataParkingLot[i] = parkingLot;
                            break;
                        }
                    }
                    fs.fileWrite('./parking-lot.json', JSON.stringify(dataParkingLot, null, 2));

                    let ticket = Factory.createSingleTicket({
                        vehicle, 
                        parkingLot, 
                        checkIn: new Date()
                    });
                    let dBTicket = fs.fileRead('./tickets.json');
                    let dataTicket = Factory.createTicket(dBTicket);
                    dataTicket.push(ticket);
                    fs.fileWrite('./tickets.json', JSON.stringify(dataTicket, null, 2));

                    resolve({
                        platNomor: ticket.vehicle.policeNumber,
                        parkingLot: ticket.parkingLot.id,
                        tanggalMasuk: moment(ticket.checkIn).format('YYYY-MM-DD hh:mm')
                    })
                } else {
                    return resolve({
                        name: 'OutOfSpace',
                        info: [{ message: 'Parking lot is out of space' }]
                    })
                }
            } else {
                return reject({
                    name: 'BadRequest',
                    errors: [{ message: 'Type property is invalid' }]
                })
            }

        })
    }

    static inputCheckOut(data) {
        return new Promise((resolve, reject) => {
            const fs = new File()
            let dBTicket = fs.fileRead('./tickets.json');
            let dBParkingLot = fs.fileRead('./parking-lot.json');
            let dataTicket = Factory.createTicket(dBTicket);
            let dataParkingLot = Factory.createParkingLot(dBParkingLot);

            let searchedTicket = this.checkOutSearchValidation(dataTicket, data);
            if (searchedTicket) {
                let parkingLot = searchedTicket.parkingLot;
                searchedTicket.checkingOut();
                parkingLot.removeVehicle();
    
                for (let i = 0; i < dataTicket.length; i++) {
                    if (dataTicket[i].policeNumber === searchedTicket.policeNumber && dataTicket[i].checkOut == null) {
                        dataTicket[i] = searchedTicket;
                        break;
                    }
                }
    
                for (let i = 0; i < dataParkingLot.length; i++) {
                    if (dataParkingLot[i].id === parkingLot.id) {
                        dataParkingLot[i] = parkingLot;
                        break;
                    }
                }
    
                fs.fileWrite('./tickets.json', JSON.stringify(dataTicket, null, 2));
                fs.fileWrite('./parking-lot.json', JSON.stringify(dataParkingLot, null, 2));
    
                resolve({
                    platNomor: searchedTicket.policeNumber,
                    tanggalMasuk: moment(searchedTicket.checkIn).format('YYYY-MM-DD hh:mm'),
                    tanggalKeluar: moment(searchedTicket.checkOut).format('YYYY-MM-DD hh:mm'),
                    jumlahBayar: searchedTicket.totalCost
                })
            } else {
                return reject({
                    name: 'NotFound',
                    errors: [{ message: `Police number does'nt exists` }]
                })
            }
        })
    }

    static queryVehicleCount(data) {
        return new Promise((resolve, reject) => {
            const fs = new File();
            let dBParkingLot = fs.fileRead('./parking-lot.json');
            let dataParkingLot = Factory.createParkingLot(dBParkingLot);
            let counter = dataParkingLot.filter(el => { return !el.availability && el.parkedVehicle.type === data.tipe.toUpperCase() }).length;

            resolve({
                jumlahKendaraan: counter
            })
        })
    }

    static queryVehicleByColor(data) {
        return new Promise((resolve, reject) => {
            const fs = new File();
            let dbVehicle = fs.fileRead('./vehicles.json');
            let dataVehicles = Factory.createVehicle(dbVehicle);
            let result = []
            dataVehicles.forEach(el => { el.color === data.warna.toLowerCase() ? result.push(el.policeNumber): null })

            resolve({
                platNomor: result
            })
        })
    }
}

module.exports = Model