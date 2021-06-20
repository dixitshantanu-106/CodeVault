const express = require('express');
const router = require('./routes');

const app = express();

app.use('/',router);

const startServer = async (PORT, callback) => {
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    }) 

    if(callback) callback(server);
    return server;
}

module.exports = { getApp: () => app, listen : startServer}