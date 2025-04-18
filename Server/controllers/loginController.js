import {Op} from "sequelize";
import users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

async function login(req, res) {
  try {
    const {identifier, password } = req.body;

    if (!identifier || !password) {
      throw new Error("please Enter all your information");
    }

    const user = await users.findOne({
      [Op.or] : {
        email: identifier,
        number : identifier,
        username : identifier,
      },
      raw: true,
    });

    if (!user) throw new Error("you are not registered! please register first");

    const password_true = await bcrypt.compare(password, user.password);

    if (password_true) {
      const { user_id, username } = user;

      const accessToken = jwt.sign(
        { user_id, username },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 36000,
        }
      );

      return res
        .cookie("AccessToken", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .send({ message: "you are logged in !", user });
    }

    throw new Error("you made a wrong password");

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export default login;
