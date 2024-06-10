const { v4: uuidv4 } = require('uuid');
const { getPeopleInterest, addPeopleInterest, deletePeopleInterest } = require('../database/userPeopleInterest.js')
const { UserPeopleInterest, User, Person } = require('../models');

const userPeopleInterests = {
  Query: {
    userPeopleInterests: async (_, { userId }) => {
      
    }
  },
  Mutation: {
    addUserPeopleInterest: async (_, { userId, personId }) => {
      
    },
    deleteUserPeopleInterest: async (_, { id }) => {
      
    }
  },
};

module.exports = userPeopleInterests;
