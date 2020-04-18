import { fetchTransactions } from "#root/adapters/accountsService";

const AccountTransactions = {
  transactions: async (userAccount) => {
    return await fetchTransactions({
      accountId: userAccount.id,
    });
  },
};

export default AccountTransactions;
