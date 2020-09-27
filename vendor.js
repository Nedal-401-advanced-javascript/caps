'use strict';
require('dotenv').config()
const events=require('./events');
var faker = require('faker');

const storeName=process.env.store_name;

let obj= {storeName:storeName, orderId:"dlsjfdslkfjlkj", customerName:faker.name.findName(), address:"Ajlun"}
// send the event 
events.on('pickup', handlePickup);
events.emit('pickup',obj)

function handlePickup(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up [${payload.orderId}]`)
    }, 1000);
}
module.exports=obj;