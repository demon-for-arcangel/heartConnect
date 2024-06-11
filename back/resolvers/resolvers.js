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
      const success = await deletePeopleInterest(id);
      return success;
    },
  },
};

module.exports = userPeopleInterests;
