import { createUser } from "#root/adapters/usersService";

const createUserResolver = async (
  obj,
  { email, password }
) => {
  return await createUser({ email, password });
};

export default createUserResolver;
