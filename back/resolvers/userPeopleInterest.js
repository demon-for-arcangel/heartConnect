const { v4: uuidv4 } = require('uuid');
const { getUserPeopleInterest, addUserPeopleInterest, deletePeopleInterest } = require('../database/userPeopleInterest.js')
const { UserPeopleInterest, User, Person } = require('../models');

const userPeopleInterests = {
  Query: {
    userPeopleInterests: (_, {userId}) => getUserPeopleInterest(userId),
  },
  Mutation: {
    addUserPeopleInterest: (_, { id, userId, personId }) => {
      const newPeopleInterest = {
        id: id,
        userId: userId,
        personId: personId
      }
      const addPeopleInterest  = addUserPeopleInterest(newPeopleInterest)
      return addPeopleInterest
    },
    deleteUserPeopleInterest: async (_, { id }) => {
      const deletePeople = deletePeopleInterest(id)
      return deletePeople
    }
  },
};

module.exports = userPeopleInterests;
