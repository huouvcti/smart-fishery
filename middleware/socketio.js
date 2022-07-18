const SocketIO = require('socket.io');

const app = require('../app');

const sensorDAO = require('../model/sensorDAO');

const socketio = (server) => {
    const io = SocketIO(server, { path: '/socket.io' });

    // namespace
    const sensor = io.of('/sensor');

    sensor.on('connection',  async (socket) => {
        let room = "";
    
        console.log("sensor 접속");

        // disconnect
        socket.on('disconnect', () => {
            console.log('socket disconnected');
        });
    
        // err
        socket.on('error', (err) => {
            console.log(err);
        });

        await socket.on('join', async (data) => {
            room = data;

            socket.join(room)
            console.log(room + " join")
        })


        socket.on('sensor_send', async (data) =>{ 
            const insert_db = await sensorDAO.insert(data)
            const sensor_key = await insert_db.insertId
            
            const parameters = {
                sensor_key: sensor_key
            }
            const db_data =  await sensorDAO.update(parameters);
            console.log(db_data);

            sensor.in(room).emit('sensor_update', db_data[0]);
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