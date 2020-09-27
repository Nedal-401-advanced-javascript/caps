// Main Hub Application
//Manages the state of every package (ready for pickup, in transit, delivered, etc)
// Logs every event to the console with a timestamp and the event payload
// i.e. “EVENT {}”

'use strict';
const events=require('./events')
events.on('pickup', payload=> log('pickup', payload));
events.on('transit', payload=> log('transit', payload));
events.on('delivered', payload=> log('delivered', payload));
require('./vendor')
require('./driver')


function log(event, payload) {
    let time = new Date();
    console.log('EVENT LOG ', {time, event, payload})
}