const { gql } = require('graphql-tag');

const typeDefs = gql`
  type UserPeopleInterest {
    id: Int
    userId: Int
    personId: Int
  }

  type Query {
    userPeopleInterests: [UserPeopleInterest]
  }

  type Mutation {
    addUserPeopleInterest(userId: Int!, personId: Int!): UserPeopleInterest
    deleteUserPeopleInterest(id: Int!): Boolean
  }
`;

module.exports = typeDefs;