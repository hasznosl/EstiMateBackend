export interface Transaction {
  date: Date;
  value: string;
  description: string;
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
