import { createUserAccount } from "../../../adapters/accountsService";

const createUserAccountResolver = async (
  obj,
  {
    name,
    userId,
    currency,
    currencyDefaultExchangeRate,
    description,
    deteriorationConstant,
  }
) => {
  return await createUserAccount({
    name,
    userId,
    currency,
    currencyDefaultExchangeRate,
    description,
    deteriorationConstant,
  });
};

export default createUserAccountResolver;
