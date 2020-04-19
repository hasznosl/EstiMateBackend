import { fetchTransactions } from "../../adapters/accountsService";

const AccountTransactions = {
  transactions: async (userAccount) => {
    const transactions = await fetchTransactions({
      accountId: userAccount.id,
    });

    return transactions;
  },
};

export default AccountTransactions;
