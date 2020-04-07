import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

export const fetchAllUsers = async () => {
  const body = await got
    .get(`${USERS_SERVICE_URI}/users`)
    .json();
  return body;
};

export const createUser = async ({ email, password }) => {
  const body = await got
    .post(`${USERS_SERVICE_URI}/users`, {
      json: { email, password },
    })
    .json();
  return body;
};

export const createUserSession = async ({
  email,
  password,
}) => {
  const body = await got
    .post(`${USERS_SERVICE_URI}/sessions`, {
      json: {
        email,
        password,
      },
    })
    .json();

  return body;
};
