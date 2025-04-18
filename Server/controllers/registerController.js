import { Op } from "sequelize";
import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import "dotenv/config";

async function register(req, res) {
  const { username, email, number, password } = req.body;

  try {
    if (!username || !email || !number || !password) {
      throw new Error("please enter all your information");
    }

    const find_user = await users.findOne({

      //checks if the username , email or number has been used before from someone else

      where: {
        [Op.or]: {
          username: username,
          number: number,
          email: email,
        },
      },
    });

    if (find_user)
      throw new Error(
        "please use another credentials, these are have been used before"
      );

    if (!find_user) {
      const saltRounds = 10;
      const hashed_password = await bcrypt.hash(password, saltRounds);
      const email_ = email.toLowerCase().trim();

      const user_ = await users.create({
        username: username,
        email: email_,
        number: number,
        password: hashed_password,
      });

      return res.status(200).json({
        message: "your account has been created succefully!",
        user: user_,
      });
    }

  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

export default register;
