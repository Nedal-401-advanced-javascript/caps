// Main Hub Application
'use strict';
/**
 * accept all inbound events and data,validate them
 * broadcast to everyone except the sender
 */
const net = require('net')
const server = net.createServer()
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server is running on ${port}`));

let socketPool = {};

server.on('connection', (socket) => {
    console.log("CAPS is online!!!");
    const id = `Socket-${Math.random()}`;
    socketPool[id] = socket;
    socket.on('data', buffer => {
        // encoded buffer
        console.log("buffer >>>> ", buffer);
        if (buffer.event && buffer.payload) {

            // parse buffer
            let msg = JSON.parse(buffer.toString());
            console.log("msg >>> ", msg);
            broadcast(msg);
            
        } else {
            console.log('check the data if it reseved right >>>>>>>>>><<<<<<<');
        }
    });
})

function broadcast(msg) {
    let payload = JSON.stringify(msg);
    for (let id in socketPool) {
        socketPool[id].write(payload);
    }
}




