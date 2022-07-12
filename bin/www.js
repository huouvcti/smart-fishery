"use strict";

require('dotenv').config({ path: 'fishery.env'});

const app = require('../app');
const http = require('http');


const port = process.env.S_PORT;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server on ' + port);
});
