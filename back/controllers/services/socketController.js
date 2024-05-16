const { sendMessage, getChatMessages } = require('../../services/messageService');

const activeSockets = {};

const socketController = (socket) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

    socket.on('disconnect', () => {
        console.log(`Cliente ${socket.id} desconectado en ${process.env.WEBSOCKETPORT}`);
        // Eliminar la conexión de socket del usuario desconectado
        if (socket.userId) {
            delete activeSockets[socket.userId];
        }
    });

    // Manejar el inicio de sesión de un usuario
    socket.on('login', (userId) => {
        // Asociar el ID de usuario con la conexión de socket
        activeSockets[userId] = socket;
        socket.userId = userId;
        console.log(`Usuario ${userId} conectado con el socket ${socket.id}`);
    });

    socket.on('create-new', (payload, callback) => {
        socket.broadcast.emit('created-new', payload);
        callback({msg: "Mensaje recibido"});
    });

    socket.on('message', (message) => {
        console.log(`Mensaje recibido de: ${JSON.stringify(message)}`);
        socket.broadcast.emit('message', message);
    });

    //para emitir los eventos puede funcionar
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

    socket.on('send-private-message', async (data) => {
        const { recipientId, message } = data;
        try {
          // Guardar el mensaje en la base de datos si es necesario
          // Aquí puedes llamar a tu servicio para guardar el mensaje
          // Luego, emitir el mensaje al cliente correspondiente que representa al destinatario
          const recipientSocketId = findSocketIdByUserId(recipientId);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit('new-private-message', message);
          } else {
            console.log('El destinatario no está conectado actualmente.');
          }
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

function findSocketIdByUserId(userId) {
    return activeSockets[userId];
}

module.exports = {
    socketController,
}