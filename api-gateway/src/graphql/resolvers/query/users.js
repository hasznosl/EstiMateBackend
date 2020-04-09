import { fetchAllUsers } from "#root/adapters/usersService";

const usersResolver = async () => {
  return (await fetchAllUsers()).map((rawUser) => ({
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    birthDay: rawUser.birth_day,
  }));
};

export default usersResolver;
