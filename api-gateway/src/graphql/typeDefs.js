import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    birthDay: String
    accounts: [UserAccount!]!
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

  type AccountTransaction {
    id: ID!
    accountId: ID!
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
    userId: ID!
    currency: String!
    currencyDefaultExchangeRate: String!
    transactions: [AccountTransaction!]!
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

    createUserAccount(
      name: String!
      userId: ID!
      currency: String!
      currencyDefaultExchangeRate: String!
      description: String!
      deteriorationConstant: String!
    ): UserAccount!

    createAccountTransaction(
      accountId: ID!
      description: String!
      date: Date!
      value: String!
    ): AccountTransaction!

    deleteUserAccount(accountId: ID!): Boolean!

    deleteAccountTransaction(transactionId: ID!): Boolean!

    deleteUserSession(sessionId: ID!): Boolean!
  }

  type Query {
    users: [User!]!
    userSession(me: Boolean!): UserSession
    userAccounts(userId: ID!): [UserAccount!]!
  }
`;

export default typeDefs;
