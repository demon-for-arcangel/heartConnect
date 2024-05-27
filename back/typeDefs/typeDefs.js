const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    receiver: User!
    timestamp: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(content: String!, senderId: ID!, receiverId: ID): Message!
  }
`;

module.exports = typeDefs;