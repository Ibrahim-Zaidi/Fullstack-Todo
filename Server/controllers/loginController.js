import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function login(req, res) {
  try {
    // console.log(req.cookie);

    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please Enter all your information");
    }

    const user = await users.findOne({
      where: {
        email: email,
      },
      raw: true,
    });

    if (!user) throw new Error("you are not registered! please register first");

    if (user.password === password) {
      const { user_id, username } = user;

      const accessToken = jwt.sign(
        { user_id, username },
        process.env.SECRET_KEY,
        {
          expiresIn: 3600,
        }
      );

      return res
        .cookie("AccessToken", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .send({ message: "you are logged in !" });
    }

    throw new Error("you made a wrong password");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export default login;
