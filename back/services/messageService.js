const db = require('../models');

const sendMessage = async (chatId, messageContent) => {
  try {
    const message = await db.Message.create({ chatId, message: messageContent });
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

module.exports = { sendMessage, getChatMessages };
