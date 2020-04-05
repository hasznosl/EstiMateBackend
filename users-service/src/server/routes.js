import { User } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";

const setupRoutes = (app) => {
  app.get("/users", async (req, res, next) => {
    const users = await User.findAll();
    return res.json(users);
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Email or Password missing!"));
    }

    try {
      const newUser = await User.create({
        email: req.body.email,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
      });

      return res.json(newUser);
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
