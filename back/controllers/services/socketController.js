const { sendMessage, getChatMessages, createChatIfNotExist, getUserChats } = require('../../services/messageService');

const activeSockets = {};

const socketController = (socket) => {
  console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`);

  socket.on('disconnect', () => {
    console.log(`Cliente ${socket.id} desconectado en ${process.env.WEBSOCKETPORT}`);
    if (socket.userId) {
      delete activeSockets[socket.userId];
    }
  });

  socket.on('login', async (userId) => {
    activeSockets[userId] = socket;
    socket.userId = userId;
    console.log(`Usuario ${userId} conectado con el socket ${socket.id}`);

    try {
      const chats = await getUserChats(userId);
      socket.emit('user-chats', chats);
    } catch (error) {
      console.error('Error al obtener los chats del usuario:', error);
    }
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
      const newMessage = await sendMessage(chatId, message, socket.userId);
      socket.to(chatId).emit('new-message', newMessage);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  });

  socket.on('send-private-message', async (data) => {
    const { recipientId, message } = data;
    try {
      const chat = await createChatIfNotExist(socket.userId, recipientId);
      const newMessage = await sendMessage(chat._id, message, socket.userId);

      // Emitir evento de nuevo chat a ambos usuarios si el chat es nuevo
      if (chat.isNew) {
        const recipientSocket = findSocketIdByUserId(recipientId);
        if (recipientSocket) {
          io.to(recipientSocket).emit('new-chat', chat);
        }
        socket.emit('new-chat', chat);
      }

      // Enviar el nuevo mensaje al destinatario si está conectado
      const recipientSocket = findSocketIdByUserId(recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('new-private-message', newMessage);
      } else {
        console.log('El destinatario no está conectado actualmente.');
      }

      // Enviar el nuevo mensaje al remitente
      socket.emit('new-private-message', newMessage);
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

const getUserChatsCon = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await getUserChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error al obtener los chats del usuario:', error);
    res.status(500).json({ message: 'Error al obtener los chats del usuario' });
  }
};

const getChatMessagesCon = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await getChatMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes del chat:', error);
    res.status(500).json({ message: 'Error al obtener los mensajes del chat' });
  }
};

const createChat = async (req, res) => {
    try {
        const { userId, friendId } = req.body; // Suponiendo que los IDs del usuario y del amigo se pasan en el cuerpo de la solicitud
        const chat = await createChatIfNotExist(userId, friendId); // Crear el chat si no existe

        res.status(201).json({ chat }); // Enviar una respuesta con el chat creado
    } catch (error) {
        console.error('Error al crear el chat:', error);
        res.status(500).json({ message: 'Error al crear el chat' }); // Enviar una respuesta de error si falla la creación del chat
    }
};

function findSocketIdByUserId(userId) {
  return activeSockets[userId]?.id;
}

module.exports = {
  socketController,
  getUserChatsCon,
  getChatMessagesCon, 
  createChat
};
