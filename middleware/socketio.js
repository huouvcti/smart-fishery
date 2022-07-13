const SocketIO = require('socket.io');

const app = require('../app');

const sensorDAO = require('../model/sensorDAO');

const socketio = (server) => {
   
    const io = SocketIO(server, { path: '/socket.io' });

    // namespace
    const sensor = io.of('/sensor');
    const ctrl = io.of('/ctrl');

    sensor.on('connection',  async (socket) => {
        let room = "";
    
        console.log("sensor 접속");

        // disconnect
        socket.on('disconnect', () => {
            console.log('socket disconnected');
            // clearInterval(socket.interval);
        });
    
        // err
        socket.on('error', (err) => {
            console.log(err);
        });


        await socket.on('join', async (data) => {
            room = data;

            socket.join(room)
            console.log(room + " join")
            // const parameters = {
            //     user_key: room
            // }
            // const db_data =  await sensorDAO.list(parameters);

            // await sensor.to(room).emit('list', db_data);
        })


        socket.on('sensor_send', async (data) =>{
            sensorDAO.insert(data);
            const parameters = {
                user_key: room
            }
            const db_data =  await sensorDAO.list(parameters);
            sensor.in(room).emit('sensor_valueL', db_data);
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