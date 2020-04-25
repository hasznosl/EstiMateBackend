export interface Transaction {
  date: string;
  value: string;
  currency: string;
  description: string;
  currencyDefaultExchangeRate: string;
}

export interface Account {
  id: string;
  transactions: Transaction[];
  name: string;
  currency: string;
}

export interface CreateTransactionMutationParam {
  variables: {
    date: string;
    value: string;
    description: string;
    accountId: string;
  };
}
