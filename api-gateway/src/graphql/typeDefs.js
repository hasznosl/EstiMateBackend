import { gql } from "apollo-server";

const typeDefs = gql`
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

  type Mutation {
    createUser(email: String!, password: String!): CreateUserResult!
  }

  type Query {
    users: [User!]!
  }
`;

export default typeDefs;
