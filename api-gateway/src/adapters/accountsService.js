import got from "got";

const ACCOUNTS_SERVICE_URI = "http://accounts-service:7100";

export const fetchUserAccounts = async ({ userId }) => {
  const body = await got
    .get(`${ACCOUNTS_SERVICE_URI}/users/${userId}/accounts`)
    .json();
  return body;
};

export const fetchTransactions = async ({ accountId }) => {
  const body = await got
    .get(
      `${ACCOUNTS_SERVICE_URI}/accounts/${accountId}/transactions`
    )
    .json();

  return body;
};

export const createUserAccount = async ({
  name,
  userId,
  currency,
  currencyDefaultExchangeRate,
  description,
  deteriorationConstant,
}) => {
  const body = await got
    .post(`${ACCOUNTS_SERVICE_URI}/accounts`, {
      json: {
        name,
        userId,
        currency,
        currencyDefaultExchangeRate,
        description,
        deteriorationConstant,
      },
    })
    .json();

  return body;
};

export const deleteUserAccount = async ({ accountId }) => {
  const body = await got
    .delete(`${ACCOUNTS_SERVICE_URI}/accounts/${accountId}`)
    .json();

  return body;
};

export const createAccountTransaction = async ({
  accountId,
  description,
  date,
  value,
}) => {
  console.log({ description });
  const body = await got
    .post(`${ACCOUNTS_SERVICE_URI}/transactions`, {
      json: { accountId, description, date, value },
    })
    .json();
  return body;
};

export const deleteAccountTransaction = async ({
  transactionId,
}) => {
  const body = await got
    .delete(
      `${ACCOUNTS_SERVICE_URI}/transactions/${transactionId}`
    )
    .json();

  return body;
};
