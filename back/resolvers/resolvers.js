const { v4: uuidv4 } = require('uuid');
const { getPeopleInterest, addPeopleInterest, deletePeopleInterest, getListFriends, deleteFriendship } = require('../database/users/userPeopleInterest.js')
const { UserPeopleInterest } = require('../models/index.js');

const userPeopleInterests = {
  Query: {
    userPeopleInterests: async (_, { userId }) => {
      if (!userId) {
        throw new Error('userId necesario');
      }
      const interests = await getPeopleInterest(userId);
      return interests;
    },
    getListFriends: async (_, { id_user }) => {
      if (!id_user) {
        throw new Error('necesitas el id_user')
      }
      const friends = await getListFriends(id_user);
      return friends;
    }
  },
  Mutation: {
    addUserPeopleInterest: async (_, { userId, personId }) => {
      const interest = await addPeopleInterest(userId, personId);
      return interest;
    },
    deleteUserPeopleInterest: async (_, { id }) => {
      try {
        const success = await deletePeopleInterest(id);
        if (success) {
          return { success: true, message: "Eliminado correctamente" };
        } else {
          return { success: false, message: "Fallo al eliminar" };
        }
      } catch (error) {
        console.error("Error", error);
        return { success: false, message: "A ocurrido un error" };
      }
    },
    deleteUserFriendShip: async (_, { id }) => {
      try {
        const success = await deleteFriendship(id);
        if (success) {
          return { success: true, message: "Eliminado correctamente"}
        } else {
          return { success: false, message: "Fallo al eliminar"};
        }
      } catch (error) {
        console.error("Error", error);
        return { success: false, message: "A ocurrido un error"};
      }
    }
  },
};

module.exports = userPeopleInterests;
