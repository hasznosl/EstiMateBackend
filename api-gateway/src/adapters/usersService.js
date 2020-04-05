import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

export const fetchAllUsers = async () => {
  const body = await got.get(`${USERS_SERVICE_URI}/users`).json();
  return body;
};
