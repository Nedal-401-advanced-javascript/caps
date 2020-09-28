'use strict';
require('dotenv').config()
var faker = require('faker');

//Connect to the CAPS server
const net = requirt('net');
const vendor = new net.Socket();

const storeName = process.env.store_name;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

vendor.connect(port, host, () => {
    console.log("Vendor connecting ... ")
});



vendor.on('data', (data) => {
    let jsonData = JSON.parse(data);
    if (jsonData.event === 'delivered') {
        console.log(`thank you for delivering ${jsonData.payload.orderId}`);
        console.log(new Date());
    }
});

setInterval(() => {
    let msg = {
        event: "pickup",
        payload: {
            storeName: storeName,
            orderId: faker.random.uuid(),
            customerName: faker.name.findName(),
            address: faker.address.country()
        }
    }
    vendor.write(JSON.stringify(msg))
}, 5000);


// send the event 
// vendor.on('pickup', handlePickup);
// // events.emit('pickup',obj)

// function handlePickup(payload) {
//     setTimeout(() => {
//         console.log(`DRIVER: picked up [${payload.orderId}]`);
//         vendor.write(msg)
//     }, 1000);
// }
module.exports = obj;