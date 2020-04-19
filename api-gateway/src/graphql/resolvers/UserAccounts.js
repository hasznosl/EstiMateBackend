import { fetchUserAccounts } from "../../adapters/accountsService";

const UserAccounts = {
  accounts: async (user) => {
    const accounts = await fetchUserAccounts({
      userId: user.id,
    });

    return accounts;
  },
};

export default UserAccounts;
