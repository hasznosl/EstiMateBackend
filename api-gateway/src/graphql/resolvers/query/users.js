import { fetchAllUsers } from "#root/adapters/usersService";

export const usersResolver = async () => {
  // TODO:  this mapping should be done in separate resolver
  return (await fetchAllUsers()).map((rawUser) => ({
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    birthDay: rawUser.birth_day,
  }));
};
