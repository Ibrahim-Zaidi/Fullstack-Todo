import jwt from "jsonwebtoken";
import "dotenv/config";

const accessKey = process.env.SECRET_KEY;

export default function check_auth_route(req, res) {
  try {
    const { AccessToken } = req.cookies;

    console.log(AccessToken);

    if (!req.cookies) throw new Error("no cookies in the req");

    // const verify = jwt.verify(cookies.AnccessToke, accessKey);

    const decoded = jwt.decode(AccessToken, accessKey);

    if (!decoded) throw new Error("the token is invalid");

    return res
      .status(200)
      .json({ token: decoded, message: "you are authenticated" });
  } catch (err) {
    res.status(404).message({ message: err.message });
  }
}
