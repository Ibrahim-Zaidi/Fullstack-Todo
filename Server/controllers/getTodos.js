import { Sequelize } from "sequelize";
import sequelize_ from "../configue/db.js";

// app.use(cookieParser());

async function get_todos(req, res) {
  try {
    const { user_id } = req.user;

    const todo_ = await sequelize_.query(
      "SELECT * FROM todos WHERE user_id = :user_id ",
      {
        replacements: { user_id },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    if (!todo_) throw new Error("there is no todo with this id");

    return res.status(200).send(todo_);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export default get_todos;
