import { fetchUser } from "#root/adapters/usersService";

const UserSession = {
  // userSession: contextualObject
  user: async (userSession) => {
    return await fetchUser({
      userId: userSession.userId,
    });
  },
};

export default UserSession;
