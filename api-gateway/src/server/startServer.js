import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import usersResolver from "#root/graphql/resolvers/query/users";
import createUserResolver from "#root/graphql/resolvers/mutation/createUser";
import createUserSessionResolver from "#root/graphql/resolvers/mutation/createUserSession";
import typeDefs from "#root/graphql/typeDefs";
import accessEnv from "#root/helpers/accessEnv";

import formatGraphQLErrors from "./formatGraphQLErrors";

const PORT = accessEnv("PORT", 7000);
const apolloServer = new ApolloServer({
  context: (a) => a,
  formatError: formatGraphQLErrors,
  resolvers: {
    Query: {
      users: usersResolver,
    },
    Mutation: {
      createUser: createUserResolver,
      createUserSession: createUserSessionResolver,
    },
  },
  typeDefs,
  playground: {
    version: "1.7.25",
  },
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

apolloServer.applyMiddleware({
  app,
  cors: false,
  path: "/graphql",
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`API gateway listening on ${PORT}`);
});
