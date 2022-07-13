const SocketIO = require('socket.io');

const app = require('../app');

const socketio = (server) => {
   
    const io = SocketIO(server, { path: '/socket.io' });

    // namespace
    const sensor = io.of('/sensor');
    const ctrl = io.of('/ctrl');

    sensor.on('connection', (socket) => {
        let room = "";
        console.log("sensor 접속");
        socket.on('join', (data) => {
            
            room = data;
            socket.join(data);

            console.log(data + " join")
        })

        socket.on("msg", (data) =>{
            console.log(data);
            sensor.to(room).emit('message', data);
        })
    });

    app.set("io_sensor", sensor);
 };

module.exports = {socketio}



// io.on('connection', (socket) => {
//     // const req = socket.request;
//     console.log("socket connected");

//     // disconnect
//     socket.on('disconnect', () => {
//         console.log('socket disconnected');
//         clearInterval(socket.interval);
//     });

//     // err
//     socket.on('error', (err) => {
//         console.log(err);
//     });
// });