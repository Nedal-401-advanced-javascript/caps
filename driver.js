'use strict';

const events = require('./events');
let obj=require('./vendor')
events.on('delivered',handleDelevry);



function handleDelevry(payload) {
    setTimeout(() => {
        console.log(`delivered`)
    }, 3000);
}

events.emit('transit', obj)
events.emit('delivered',obj)

module.exports=handleDelevry;