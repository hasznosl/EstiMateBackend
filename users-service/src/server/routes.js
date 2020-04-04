import { User } from "#root/db/models";

const setupRoutes = (app) => {
  app.get("/users", async (req, res, next) => {
    const users = await User.findAll();
    return res.json(users);
  });
};

export default setupRoutes;
