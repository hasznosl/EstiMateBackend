import { Transaction } from "../types/types";

const CORRECT_ROUNDING_ERROR = 100000;

const getConvertedAmount = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const defaultExchange = parseFloat(
    transaction.currencyDefaultExchangeRate
  );
  const value =
    ((parseFloat(transaction.value)
      ? parseFloat(transaction.value)
      : 0) *
      CORRECT_ROUNDING_ERROR) /
    ((defaultExchange ? defaultExchange : 1) *
      CORRECT_ROUNDING_ERROR);
  if (!isNaN(value)) {
    return value;
  } else {
    return 0;
  }
};

export default getConvertedAmount;
