import { Account, Transaction } from "../types/types";
import { orderBy } from "lodash";
import formatDate from "./formatDate";
import { isAfter, addDays, isSameDay } from "date-fns";
import getConvertedAmount from "./getConvertedAmount";

interface Params {
  accounts: Account[];
}

export interface SummedTransactions {
  [date: string]: number;
}

export const createSummedTransactionsFromTransactions = ({
  accounts,
}: Params): SummedTransactions => {
  let transactions: Transaction[] = [];

  accounts.forEach((account) => {
    account.transactions.forEach((transaction) =>
      transactions.push(transaction)
    );
  });

  transactions = orderBy(transactions, (transaction) =>
    new Date(transaction.date).getTime()
  );

  if (!transactions[0]) {
    return {};
  }
  const firstDate = new Date(transactions[0].date);
  const lastDate = new Date(
    transactions[transactions.length - 1].date
  );
  let currentDate = firstDate;
  let summedTransactions: SummedTransactions = {};
  let lastSummedTransactionValue = {
    date: formatDate(firstDate),
    worth: 0,
  };
  while (!isAfter(currentDate, lastDate)) {
    const currentKey = formatDate(currentDate);
    summedTransactions[currentKey] = 0;
    currentDate = addDays(currentDate, 1);
  }
  transactions.forEach((transaction) => {
    if (
      isSameDay(
        new Date(lastSummedTransactionValue.date),
        new Date(transaction.date)
      )
    ) {
      lastSummedTransactionValue = {
        worth:
          lastSummedTransactionValue.worth +
          getConvertedAmount({ transaction }),
        date: transaction.date,
      };
      summedTransactions[formatDate(transaction.date)] =
        lastSummedTransactionValue.worth;
    } else {
      let currentDate = formatDate(
        addDays(
          new Date(lastSummedTransactionValue.date),
          1
        )
      );
      while (
        !isAfter(
          new Date(currentDate),
          new Date(transaction.date)
        )
      ) {
        summedTransactions[formatDate(currentDate)] =
          lastSummedTransactionValue.worth;
        if (
          isSameDay(
            new Date(currentDate),
            new Date(transaction.date)
          )
        ) {
          lastSummedTransactionValue = {
            worth:
              lastSummedTransactionValue.worth +
              getConvertedAmount({ transaction }),
            date: currentDate,
          };
          summedTransactions[formatDate(transaction.date)] =
            lastSummedTransactionValue.worth;
        }
        currentDate = formatDate(
          addDays(new Date(currentDate), 1)
        );
      }
    }
  });

  return summedTransactions;
};
