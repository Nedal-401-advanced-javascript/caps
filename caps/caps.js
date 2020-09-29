// Main Hub Application
'use strict';
/**
 * accept all inbound events and data,validate them
 * broadcast to everyone except the sender
 */

// const port = process.env.PORT || 4000;
const io = require('socket.io')(3000)
const caps = io.of('/caps')

io.on('connection', (socket) => {
    console.log("Welcome to our system, we care about you!", socket.id)
});
caps.on('connection', socket => {

    let currentRoom = '';
    socket.on('join', room => {
        // console.log('>>>>>>>>>>>>>>>>>>>');
        socket.leave(currentRoom);
        socket.join(room);
        currentRoom = room;
        // console.log(currentRoom,"<<<<<<<<<<<<<<<<<<<<<<<<<<");
        // caps.emit('action', `Someone Joined Room : ${currentRoom}`);
        // caps.to(`${socket.id}`).emit('joined', room);

        socket.on('pickup', payload => {
            console.log('>>> pickup <<<', payload);
            caps.emit('pickup', payload)

        });
    })
    socket.on('in-transit', payload => {
        console.log('>>> in-transit <<<',currentRoom);
        caps.in(currentRoom).emit('in-transit', payload)
    });
    socket.on('delivered', payload => {
        console.log('>>> delivered <<<');
        caps.in(currentRoom).emit('delivered', payload)
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