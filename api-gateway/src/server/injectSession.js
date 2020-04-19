import { fetchUserSession } from "../adapters/usersService";

const injectSession = async (req, res, next) => {
  if (req.cookies.userSessionId) {
    try {
      const userSession = await fetchUserSession({
        // get the session id from the cookies of the request
        sessionId: req.cookies.userSessionId,
      });
      res.locals.userSession = userSession;
    } catch (e) {
      return next(e);
    }
  }

  return next();
};

export default injectSession;
