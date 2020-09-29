'use strict';


const io = require('socket.io-client')
const driver = io.connect('http://localhost:3000/caps');

driver.on('connect', () => {
    console.log("[driver] I am ready to delever your packegs !!! ");

    driver.on('pickup', payload => {
        handlePickup(payload)
        handleDelevry(payload)
    })
})


function handlePickup(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${payload.orderId}]`, new Date());
        driver.emit('in-transit', payload)
    }, 1500);
}


function handleDelevry(payload) {
    setTimeout(() => {
        driver.emit('delivered', payload)
    }, 3000);
}