'use strict';

const net = require('net')
const driver = new net.Socket();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

driver.connect(port, host, () => {
    console.log("driver connecting ... ")
});
driver.on('close', function () {
    console.log("connection is closed!!");
});

driver.on('data', (data) => {
    let jsonData = JSON.parse(data);
    if (jsonData.event==='pickup'){
        handlePickup(jsonData)
        handleDelevry(jsonData)
    }
});



function handlePickup(jsonData) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${jsonData.payload.orderId}]`,new Date());
        jsonData.event='in-transit';
        driver.write(JSON.stringify(jsonData))
    }, 1000);
}




function handleDelevry(jsonData) {
    setTimeout(() => {
        jsonData.event='delivered';  
        driver.write(JSON.stringify(jsonData))
    }, 3000);
}

