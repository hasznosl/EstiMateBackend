import { fetchUserAccounts } from "../../../adapters/accountsService";

const userAccountsResolver = async (
  obj,
  { userId }, // args
  context
) => {
  return (await fetchUserAccounts({ userId })).map(
    (rawUserAccount) => ({
      id: rawUserAccount.id,
      userId: rawUserAccount.userId,
      name: rawUserAccount.name,
      description: rawUserAccount.description,
      birthDay: rawUserAccount.birth_day,
      currency: rawUserAccount.currency,
      currencyDefaultExchangeRate:
        rawUserAccount.currency_default_exchange_rate,
      description: rawUserAccount.description,
      deteriorationConstant:
        rawUserAccount.deterioration_constant,
    })
  );
};

export default userAccountsResolver;
