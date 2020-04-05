import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    birthDay: String!
  }

  type Query {
    users: [User!]!
  }
`;

export default typeDefs;
