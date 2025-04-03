import jwt from "jsonwebtoken";
import "dotenv/config";

async function auth(req, res, next) {
  try {
    const { AccessToken } = req.cookies;

    if (!AccessToken) {
      throw new Error("there is no token ");
    }

    let token = AccessToken;

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default auth;
