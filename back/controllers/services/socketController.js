const socketController = (socket) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

    socket.on('disconnect', () => {
        console.log(`Cliente ${socket.id} desconectado en ${process.env.WEBSOCKETPORT}`);
    });

    socket.on('connect', () => {
        console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);
    });

    socket.on('create-new', (payload, callback) => {
        callback({msg: "Mensaje recibido"});
        socket.broadcast.emit('created-new', payload);
    }); 


}

module.exports = {
    socketController,
}