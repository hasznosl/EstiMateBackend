import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    birthDay: String
  }

  type CreateUserResult {
    email: String!
    id: ID!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
    ): CreateUserResult!

    createUserSession(
      email: String!
      password: String!
    ): UserSession!

    deleteUserSession(sessionId: ID!): Boolean!
  }

  type Query {
    users: [User!]!
    userSession(me: Boolean!): UserSession
  }
`;

export default typeDefs;
