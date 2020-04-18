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

  type Transaction {
    id: ID!
    accountId: ID!
    name: String!
    currency: String!
    currencyDefaultExchangeRate: String!
    description: String!
    date: Date!
    value: String!
    createdAt: Date!
  }

  type UserAccount {
    id: ID!
    name: String!
    currency: String!
    currencyDefaultExchangeRate: String!
    transactions: [Transaction!]!
    description: String
    deteriorationConstant: String!
    createdAt: Date!
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
    userAccounts(userId: ID!): [UserAccount!]!
  }
`;

export default typeDefs;
