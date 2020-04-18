import { fetchUser } from "#root/adapters/usersService";

const UserSession = {
  // userSession: contextual object
  user: async (userSession) => {
    return await fetchUser({
      userId: userSession.userId,
    });
  },
};

export default UserSession;
