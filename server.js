const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crear la aplicación y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos (como la página HTML)
app.use(express.static('public'));

// Manejar la conexión de un cliente
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Recibir las coordenadas y retransmitirlas a otros clientes
    socket.on('sendLocation', (data) => {
        const { latitude, longitude } = data;
        console.log('Coordenadas recibidas:', latitude, longitude);
        
        // Retransmitir las coordenadas a todos los demás clientes
        socket.broadcast.emit('locationBroadcast', { latitude, longitude });
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar el servidor
server.listen(3000, () => {
    console.log('Servidor en funcionamiento en http://localhost:3000');
});
