import { deleteAccountTransaction } from "../../../adapters/accountsService";

const deleteAccountTransactionResolver = async (
  obj,
  { transactionId },
  context
) => {
  await deleteAccountTransaction(
    {
      transactionId,
    },
    context
  );

  return true;
};

export default deleteAccountTransactionResolver;
