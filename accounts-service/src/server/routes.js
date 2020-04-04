const setupRoutes = (app) => {
  app.get("/accounts", (req, res, next) => {
    return res.json({ message: "working" });
  });
};

export default setupRoutes;
