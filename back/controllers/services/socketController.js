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
    if (!userId) {
      console.error('userId no proporcionado en el evento de login');
      return;
    }
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

  socket.on('send-private-message', async (data) => {
    const { chatId, messageContent, senderId } = data;
    console.log('Mensaje recibido:', { chatId, messageContent, senderId }); 
    if (!chatId || !messageContent || !senderId) {
      console.error('chatId, messageContent o senderId no proporcionado en el evento send-private-message');
      return;
    }
    try {
      const chat = await createChatIfNotExist(senderId, chatId);
      const newMessage = await sendMessage(chatId, messageContent, senderId);
  
      if (chat.isNew) {
        const recipientSocket = findSocketIdByUserId(chat.friendId);
        if (recipientSocket) {
          io.to(recipientSocket).emit('new-chat', chat);
        }
        socket.emit('new-chat', chat);
      }
  
      const recipientSocket = findSocketIdByUserId(chat.friendId);
      if (recipientSocket) {
        io.to(recipientSocket).emit('new-private-message', newMessage);
      } else {
        console.log('El destinatario no está conectado actualmente.');
      }
  
      socket.emit('new-private-message', newMessage);
    } catch (error) {
      console.error('Error al enviar el mensaje privado:', error);
    }
  });
  
  

  socket.on('join-chat', async (chatId) => {
    if (!chatId) {
      console.error('chatId no proporcionado en el evento join-chat');
      return;
    }
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
        const { userId, friendId } = req.body; 
        const chat = await createChatIfNotExist(userId, friendId); 

        res.status(201).json({ chat }); 
    } catch (error) {
        console.error('Error al crear el chat:', error);
        res.status(500).json({ message: 'Error al crear el chat' }); 
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
