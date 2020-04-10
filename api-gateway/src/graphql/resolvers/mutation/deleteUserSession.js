import { deleteUserSession } from "#root/adapters/usersService";

const deleteUserSessionResolver = async (
  obj,
  { sessionId },
  context
) => {
  await deleteUserSession(
    {
      sessionId,
    },
    context
  );

  // clearing the cookie
  context.res.clearCookie("userSessionId");

  return true;
};

export default deleteUserSessionResolver;
