import { Op } from "sequelize";
import users from "../models/userModel.js";

async function register(req, res) {
  const { username, email, number, password } = req.body;

  try {
    if (!username || !email || !number || !password) {
      // return res
      //   .status(404)
      //   .json({ message: "" });

      throw new Error("please enter all your information");
    }

    const find_user = await users.findOne({
      //checks if the username , email or nubmer has been used before from someone else
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
        "please use another cridentials, thesea are have been used before"
      );

    if (!find_user) {
      const created_user = await users.create({
        username: username,
        email: email,
        number: number,
        password: password,
      });

      return res
        .status(200)
        .json({ message: "your account has been created succefully!" });
    }

    // return res
    //   .status(404)
    //   .json({ message: "username or password has been taken before !" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

export default register;
