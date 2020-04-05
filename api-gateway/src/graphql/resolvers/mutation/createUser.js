import { createUser } from "#root/adapters/usersService";

export const createUserResolver = async (obj, { email, password }) => {
  return await createUser({ email, password });
};
