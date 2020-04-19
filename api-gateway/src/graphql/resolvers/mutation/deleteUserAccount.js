import { deleteUserAccount } from "../../../adapters/accountsService";

const deleteUserAccountResolver = async (
  obj,
  { accountId },
  context
) => {
  await deleteUserAccount(
    {
      accountId,
    },
    context
  );

  return true;
};

export default deleteUserAccountResolver;
