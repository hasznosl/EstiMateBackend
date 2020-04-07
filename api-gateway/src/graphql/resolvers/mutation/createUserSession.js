import { createUserSession } from "#root/adapters/usersService";

const createUserSessionResolver = async (
  obj,
  { email, password },
  context
) => {
  const userSession = await createUserSession(
    {
      email,
      password,
    },
    context
  );

  context.res.cookie("userSessionId", userSession.id, {
    httpOnly: true,
  });

  return userSession;
};

export default createUserSessionResolver;
