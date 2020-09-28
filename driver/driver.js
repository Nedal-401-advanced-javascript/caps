'use strict';

const net = require('net')
const driver = new net.Socket();


driver.on('data', (data) => {
    let jsonData = JSON.parse(data);
    if (jsonData.event==='pickup'){
        handlePickup(jsonData)
        handleDelevry(jsonData)
        console.log(`thank you for delivering ${jsonData.payload.orderId}`);
        console.log(new Date());
    }
});



function handlePickup(jsonData) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${jsonData.payload.orderId}]`);
        jsonData.event='in-transit';
        vendor.write(JSON.stringify(jsonData))
    }, 1000);
}




function handleDelevry(payload) {
    setTimeout(() => {
        jsonData.event='delivered';
        
        vendor.write(JSON.stringify(jsonData))
    }, 3000);
}

