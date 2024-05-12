const { sendMessage, getChatMessages } = require('../../services/messageService');
const socketController = (socket) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

    socket.on('disconnect', () => {
        console.log(`Cliente ${socket.id} desconectado en ${process.env.WEBSOCKETPORT}`);
    });

    socket.on('connect', () => {
        console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);
    });

    socket.on('create-new', (payload, callback) => {
        socket.broadcast.emit('created-new', payload);
        callback({msg: "Mensaje recibido"});
    });

    socket.on('message', (message) => {
        console.log(`Mensaje recibido de: ${JSON.stringify(message)}`);
        socket.broadcast.emit('message', message);
    });


     // Evento para enviar un mensaje
     socket.on('send-message', async (data) => {
        const { chatId, message } = data;
        try {
            // Guardar el mensaje en la base de datos
            const newMessage = await sendMessage(chatId, message);

            // Emitir el mensaje a todos los clientes conectados al chat
            io.to(chatId).emit('new-message', newMessage);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    });

    // Evento para enviar un mensaje a un usuario específico
    socket.on('send-private-message', async (data) => {
        const { recipientId, message } = data;
        try {
            // Guardar el mensaje en la base de datos
            const newMessage = await sendMessage(recipientId, message);

            // Emitir el mensaje al cliente que corresponde al destinatario
            io.to(recipientId).emit('new-private-message', newMessage);
        } catch (error) {
            console.error('Error al enviar el mensaje privado:', error);
        }
    });

    // Evento para unirse a un chat y obtener los mensajes
    socket.on('join-chat', async (chatId) => {
        try {
            // Obtener los mensajes del chat desde la base de datos
            const messages = await getChatMessages(chatId);

            // Emitir los mensajes al cliente que se unió al chat
            socket.emit('chat-messages', messages);
        } catch (error) {
            console.error('Error al unirse al chat:', error);
        }
    });
}

module.exports = {
    socketController,
}