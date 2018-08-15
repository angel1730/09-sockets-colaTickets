const express = require('express');
const path = require('path');

//Importamos el paquete de socketIo
const socketIO = require('socket.io')
const http = require('http')

const app = express();
//Creamos el servidor pasandole como argumente el app
let server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//Esta es la comunicacion del Backend
module.exports.io = socketIO(server)

//Importamos directamente el archivo de sockets.js
require('./sockets/socket')


//Cambiamos app por server
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});