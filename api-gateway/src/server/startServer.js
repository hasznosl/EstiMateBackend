import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import usersResolver from "../graphql/resolvers/query/users";
import createUserResolver from "../graphql/resolvers/mutation/createUser";
import createUserSessionResolver from "../graphql/resolvers/mutation/createUserSession";
import deleteUserSessionResolver from "../graphql/resolvers/mutation/deleteUserSession";
import createUserAccountResolver from "../graphql/resolvers/mutation/createUserAccount";
import deleteUserAccountResolver from "../graphql/resolvers/mutation/deleteUserAccount";
import createAccountTransactionResolver from "../graphql/resolvers/mutation/createAccountTransaction";
import deleteAccountTransactionResolver from "../graphql/resolvers/mutation/deleteAccountTransaction";
import typeDefs from "../graphql/typeDefs";
import accessEnv from "../helpers/accessEnv";
import UserSession from "../graphql/resolvers/UserSession";
import AccountTransactions from "../graphql/resolvers/AccountTransactions";
import UserAccounts from "../graphql/resolvers/UserAccounts";

import formatGraphQLErrors from "./formatGraphQLErrors";
import injectSession from "./injectSession";
import userSessionResolver from "../graphql/resolvers/query/userSession";
import userAccountsResolver from "../graphql/resolvers/query/userAccounts";

const PORT = accessEnv("PORT", 7000);
const apolloServer = new ApolloServer({
  context: (a) => a,
  formatError: formatGraphQLErrors,
  resolvers: {
    Query: {
      users: usersResolver,
      userSession: userSessionResolver,
      userAccounts: userAccountsResolver,
    },
    Mutation: {
      createUser: createUserResolver,
      createUserSession: createUserSessionResolver,
      createUserAccount: createUserAccountResolver,
      createAccountTransaction: createAccountTransactionResolver,
      deleteUserAccount: deleteUserAccountResolver,
      deleteAccountTransaction: deleteAccountTransactionResolver,
      deleteUserSession: deleteUserSessionResolver,
    },
    UserSession,
    UserAccount: AccountTransactions,
    User: UserAccounts,
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

app.use(injectSession);

apolloServer.applyMiddleware({
  app,
  cors: false,
  path: "/graphql",
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`API gateway listening on ${PORT}`);
});
