import jwt from "jsonwebtoken";
import "dotenv/config";

const accessKey = process.env.JWT_SECRET_KEY;

export default function check_auth_route(req, res) {
  try {
    const { AccessToken } = req.cookies;

    if (!AccessToken) throw new Error("no cookies in the req");

    const decoded = jwt.decode(AccessToken, accessKey);

    if (!decoded) throw new Error("the token is invalid");

    return res
      .status(200)
      .json({ token: decoded, message: "you are authenticated" });
  } catch (err) {
    res.status(404).message({ message: err.message });
  }
}

