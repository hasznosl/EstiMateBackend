import { Account, Transaction } from "../db/models";
import generateUUID from "../helpers/generateUUID";

const requiredBodyParamChecker = ({
  body,
  paramName,
  url,
  method,
  next,
}) => {
  if (!body[paramName]) {
    return (
      !!next(
        new Error(
          `${paramName} missing on ${method}: ${url} call!`
        )
      ) || true
    );
  } else {
    return false;
  }
};

const requiredBodyParamsChecker = ({
  body,
  paramNames,
  url,
  method,
  next,
}) => {
  paramNames.some((paramName) =>
    requiredBodyParamChecker({
      body,
      paramName,
      url,
      method,
      next,
    })
  );
};

// TODO: all these resources should be
// checked against the user session later
// either here or in the api gateway
const setupRoutes = (app) => {
  app.get(
    "/users/:userId/accounts",
    async (req, res, next) => {
      try {
        const accounts = await Account.findAll({
          where: {
            userId: req.params.userId,
          },
        });
        return res.json(accounts);
      } catch (e) {
        return next(e);
      }
    }
  );

  app.get(
    "/accounts/:accountId/transactions",
    async (req, res, next) => {
      try {
        const transactions = await Transaction.findAll({
          where: {
            accountId: req.params.accountId,
          },
        });

        return res.json(transactions);
      } catch (e) {
        return next(e);
      }
    }
  );

  const accountsUrl = "/accounts";
  app.post(
    accountsUrl,
    async (
      {
        body: {
          name,
          userId,
          currency,
          deterioration_constant,
          currency_default_exchange_rate,
          description,
        },
        body,
      }, // req
      res,
      next
    ) => {
      requiredBodyParamsChecker({
        body,
        paramNames: [
          "name",
          "userId",
          "currency",
          "deterioration_constant",
          "description",
          "currency_default_exchange_rate",
        ],
        url: accountsUrl,
        method: "POST",
        next,
      });

      try {
        const newAccount = await Account.create({
          id: generateUUID(),
          userId,
          name,
          currency,
          deterioration_constant,
          currency_default_exchange_rate,
          description,
        });

        return res.json(newAccount);
      } catch (e) {
        return next(e);
      }
    }
  );

  const transactionsUrl = "/transactions";
  app.post(
    transactionsUrl,
    async (
      {
        body: { accountId, date, description, value },
        body,
      }, // req
      res,
      next
    ) => {
      requiredBodyParamsChecker({
        body,
        paramNames: [
          "date",
          "accountId",
          "description",
          "value",
        ],
        url: transactionsUrl,
        method: "POST",
        next,
      });

      const {
        currency,
        currency_default_exchange_rate,
      } = await Account.findByPk(accountId);

      try {
        const newTransaction = await Transaction.create({
          id: generateUUID(),
          date,
          accountId,
          description,
          value,
          currency,
          currency_default_exchange_rate,
        });

        return res.json(newTransaction);
      } catch (e) {
        return next(e);
      }
    }
  );

  app.delete(
    "/transactions/:transactionId",
    async (req, res, next) => {
      try {
        const transaction = await Transaction.findByPk(
          req.params.transactionId
        );

        if (!transaction)
          return next(new Error("Invalid transaction ID!"));

        await transaction.destroy();

        return res.end();
      } catch (e) {
        return next(e);
      }
    }
  );

  app.delete(
    "/accounts/:accountId",
    async (req, res, next) => {
      try {
        const account = await Account.findByPk(
          req.params.accountId
        );

        if (!account)
          return next(new Error("Invalid account ID!"));

        await account.destroy();

        return res.end();
      } catch (e) {
        return next(e);
      }
    }
  );
};

export default setupRoutes;
