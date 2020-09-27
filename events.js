'use strict';
//Global Event Pool (shared by all modules)
const events = require('events');
const createEvent = new events();


module.exports = createEvent;