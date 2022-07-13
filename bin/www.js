"use strict";

require('dotenv').config({ path: 'fishery.env'});

const app = require('../app');
const http = require('http');

const webSocketTest = require('../middleware/socketioTest');
const {socketio} = require('../middleware/socketio');

const port = process.env.S_PORT;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server on ' + port);
});


// webSocketTest(server);

socketio(server, app);

module.exports = server;