const db = require('../models');

const sendMessage = async (chatId, messageContent, senderId) => {
  try {
    const message = await db.Message.create({ chatId, message: messageContent, senderId });
    return message;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    throw error;
  }
};

const getChatMessages = async (chatId) => {
  try {
    const messages = await db.Message.findAll({ where: { chatId } });
    return messages;
  } catch (error) {
    console.error('Error al recuperar los mensajes del chat:', error);
    throw error;
  }
};

const createChatIfNotExist = async (userId, friendId) => {
  try {
    let chat = await db.Chat.findOne({ where: { userId, friendId } });
    let isNew = false;
    if (!chat) {
      chat = await db.Chat.create({ userId, friendId });
      isNew = true;
    }
    return { ...chat.toJSON(), isNew };
  } catch (error) {
    console.error('Error al crear el chat:', error);
    throw error;
  }
};

const getUserChats = async (userId) => {
  try {
    const chats = await db.Chat.findAll({
      where: { userId },
      include: [
        {
          model: db.User,
          as: 'friend',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });
    return chats;
  } catch (error) {
    console.error('Error al obtener los chats del usuario:', error);
    throw error;
  }
};
module.exports = { sendMessage, getChatMessages, createChatIfNotExist, getUserChats };
