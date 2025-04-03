import jwt from "jsonwebtoken";
import "dotenv/config";

const accessKey = process.env.SECRET_KEY;

export default function check_auth_route(req, res) {
  try {
    const cookies = req.cookies;

    if (!cookies) throw new Error("no cookies in the req");

    const decoded = jwt.decode(cookies.AnccessToke, accessKey);

    return res.status(200).send(decoded);
  } catch (err) {
    res.status(404).message({ message: err.message });
  }
}
