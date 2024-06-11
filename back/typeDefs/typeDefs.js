const { gql } = require('graphql-tag');

const typeDefs = gql`
  type UserPeopleInterest {
    id: Int
    userId: Int
    personId: Int
  }

  type Query {
    userPeopleInterests(userId: Int): [UserPeopleInterest]
  }

  type Mutation {
    addUserPeopleInterest(userId: Int!, personId: Int): UserPeopleInterest!
    deleteUserPeopleInterest(id: String): Boolean!
  }
`;

module.exports = typeDefs;