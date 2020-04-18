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
