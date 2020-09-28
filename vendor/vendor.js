'use strict';
require('dotenv').config()
var faker = require('faker');

//Connect to the CAPS server
const net = require('net');
const vendor = new net.Socket();

const storeName = process.env.store_name;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

vendor.connect(port, host, () => {
    console.log("Vendor connecting ... ")
});
vendor.on('close', function () {
    console.log("connection is closed!!");
});


vendor.on('data', (data) => {
    let jsonData = JSON.parse(data);
    if (jsonData.event === 'delivered') {
        console.log(`thank you for delivering ${jsonData.payload.orderId}`,new Date());
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
}, 30000);


