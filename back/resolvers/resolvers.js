const resolvers = {
    Query: {
      messages: async () => {
        // Aquí necesitarías obtener los mensajes de la base de datos
        // Por ejemplo, devolvemos un array vacío
        return [];
      },
    },
    Mutation: {
      sendMessage: async (_, { content, senderId, receiverId }) => {
        // Aquí necesitarías crear un nuevo mensaje en la base de datos
        // Por ejemplo, devolvemos un objeto de mensaje
        const newMessage = {
          id: 'unique_id', // Genera un ID único
          content,
          sender: { id: senderId, name: 'Sender Name' }, // Necesitarías obtener el nombre del remitente
          receiver: { id: receiverId, name: 'Receiver Name' }, // Necesitarías obtener el nombre del destinatario
          timestamp: new Date().toISOString(),
        };
  
        // Guarda el nuevo mensaje en la base de datos
        // Por ejemplo, devolvemos un array vacío
        return [newMessage];
      },
    },
  };
  
  module.exports = resolvers;