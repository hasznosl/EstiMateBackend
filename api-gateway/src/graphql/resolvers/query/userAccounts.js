import { fetchUserAccounts } from "#root/adapters/accountsService";

const userAccountsResolver = async (
  obj,
  { userId }, // args
  context
) => {
  return (await fetchUserAccounts({ userId })).map(
    (rawUser) => ({
      id: rawUser.id,
      name: rawUser.name,
      email: rawUser.email,
      birthDay: rawUser.birth_day,
    })
  );
};

export default userAccountsResolver;
