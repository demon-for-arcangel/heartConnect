const { sendMessage, getChatMessages, createChatIfNotExist } = require('../../services/messageService');

const activeSockets = {};

const socketController = (socket) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

    socket.on('disconnect', () => {
        console.log(`Cliente ${socket.id} desconectado en ${process.env.WEBSOCKETPORT}`);
        if (socket.userId) {
            delete activeSockets[socket.userId];
        }
    });

    socket.on('login', (userId) => {
        activeSockets[userId] = socket;
        socket.userId = userId;
        console.log(`Usuario ${userId} conectado con el socket ${socket.id}`);
    });

    socket.on('create-new', (payload, callback) => {
        socket.broadcast.emit('created-new', payload);
        callback({ msg: "Mensaje recibido" });
    });

    socket.on('message', (message) => {
        console.log(`Mensaje recibido de: ${JSON.stringify(message)}`);
        socket.broadcast.emit('message', message);
    });

    socket.on('send-message', async (data) => {
        const { chatId, message } = data;
        try {
            const newMessage = await sendMessage(chatId, message);
            io.to(chatId).emit('new-message', newMessage);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    });

    socket.on('send-private-message', async (data) => {
        const { recipientId, message } = data;
        try {
            const chat = await createChatIfNotExist(socket.userId, recipientId);
            const newMessage = await sendMessage(chat.id, message);
            const recipientSocketId = findSocketIdByUserId(recipientId);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('new-private-message', newMessage);
            } else {
                console.log('El destinatario no está conectado actualmente.');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje privado:', error);
        }
    });

    socket.on('join-chat', async (chatId) => {
        try {
            const messages = await getChatMessages(chatId);
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
