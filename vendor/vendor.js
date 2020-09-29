'use strict';
require('dotenv').config()
var faker = require('faker');


const storeName = process.env.store_name;

const io = require('socket.io-client')
const vendor = io.connect('http://localhost:3000/caps');

vendor.on('connect', () => {
    console.log("[vendor] I am following your packegs !!! ");
    let channel = 'venderRoom';
    vendor.emit('join', channel)

    // vendor.on('joined', (joinChannel) => {
    //     console.log("on Joined!!! joinChannel:  ", joinChannel)
    //     channel = joinChannel;
    // });
    vendor.on('delivered', payload => {
        console.log(`thank you for delivering ${payload.orderId}`, new Date());
    })

    setInterval(() => {

        let payload = {
            storeName: storeName,
            orderId: faker.random.uuid(),
            customerName: faker.name.findName(),
            address: faker.address.country()
        }
        vendor.emit("pickup", payload)
    }, 15000);
})