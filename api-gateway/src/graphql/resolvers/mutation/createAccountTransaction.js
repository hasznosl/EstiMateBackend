import { createAccountTransaction } from "../../../adapters/accountsService";

const createAccountTransactionResolver = async (
  obj,
  { accountId, description, date, value }
) => {
  return await createAccountTransaction({
    accountId,
    description,
    date,
    value,
  });
};

export default createAccountTransactionResolver;
