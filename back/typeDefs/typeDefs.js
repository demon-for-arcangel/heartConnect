const { gql } = require('graphql-tag');

const typeDefs = gql`
  type UserPeopleInterest {
    id: Int
    userId: Int
    personId: Int
  }

  type UserFriendShip {
    id: Int!
    id_user: Int!
    id_friendship: Int!
  }

  type Query {
    userPeopleInterests(userId: Int): [UserPeopleInterest]
    getListFriends(id_user: Int): [UserFriendShip]
  }

  type Mutation {
    addUserPeopleInterest(userId: Int!, personId: Int): UserPeopleInterest!
    addFriendship(id_user: Int!, id_friendship: Int): UserFriendShip!
    deleteUserPeopleInterest(id: Int): DeleteUserPeopleInterestResult!
    deleteUserFriendShip(id: Int): DeleteUserFriendShipResult!
  }

  type DeleteUserPeopleInterestResult {
    success: Boolean!
    message: String
  }

  type DeleteUserFriendShipResult {
    success: Boolean!
    message: String
  }
`;

module.exports = typeDefs;