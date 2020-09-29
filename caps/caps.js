// Main Hub Application
'use strict';
/**
 * accept all inbound events and data,validate them
 * broadcast to everyone except the sender
 */
// const net = require('net')
// const server = net.createServer()
const port = process.env.PORT || 4000;
const io=require('socket.oi')(port)

io.on('connection',(socket)=>{
    console.log("CAPS Connection!")
})
let currentRoom='';
const caps = io.of('/caps')
caps.on('join',room=>{
    caps.leave(currentRoom);
    caps.join(room);

    caps.on('pickup', payload=>{
        caps.to(currentRoom).emit('pickup',payload)
        // caps.broadcast.emit('pickup',payload)

    });
    caps.on('in-transit', payload=>{
        caps.to(currentRoom).emit('in-transit',payload)
    });
    caps.on('delivered', payload=>{
        caps.to(currentRoom).emit('delivered',payload)
    });
})

// server.listen(port, () => console.log(`server is running on ${port}`));

// let socketPool = {};

// server.on('connection', (socket) => {
//     console.log("CAPS is online!!!");
//     const id = `Socket-${Math.random()}`;
//     socketPool[id] = socket;
//     socket.on('data', buffer => {
//         // encoded buffer
//         // console.log("buffer >>>> ", buffer);
//         let msg = JSON.parse(buffer.toString());
//         console.log("msg >>> ", msg);
//         broadcast(msg);
        
//     });
// });

// server.on('error', (e)=> {
//     console.log("ERROR !!!!!!! ", e)
// })

// function broadcast(msg) {
//     let payload = JSON.stringify(msg);
//     for (let id in socketPool) {
//         socketPool[id].write(payload);
//     }
// }




