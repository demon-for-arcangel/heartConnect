const { v4: uuidv4 } = require('uuid');
const { getPeopleInterest, addPeopleInterest, deletePeopleInterest } = require('../database/users/userPeopleInterest.js')
const { UserPeopleInterest } = require('../models/index.js');

const userPeopleInterests = {
  Query: {
    userPeopleInterests: async (_, { userId }) => {
      if (!userId) {
        throw new Error('userId is required');
      }
      const interests = await getPeopleInterest(userId);
      return interests;
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
          return { success: true, message: "Interest deleted successfully" };
        } else {
          return { success: false, message: "Failed to delete interest" };
        }
      } catch (error) {
        console.error("Error deleting user interest:", error);
        return { success: false, message: "An unexpected error occurred" };
      }
    },
  },
};

module.exports = userPeopleInterests;
