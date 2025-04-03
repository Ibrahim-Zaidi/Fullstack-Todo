import todos from "../models/todoModel.js";
import sequelize_ from "../configue/db.js";

async function delete_todo(req, res) {
  try {
    const { user_id } = req.user;

    if (!user_id) throw new Error("acccess Denied!");

    const todo_ = await todos.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!todo_) throw new Error("there is no todo with this id");

    await sequelize_.query("DELETE FROM todos WHERE user_id = :user_id", {
      replacements: { user_id },
    });

    return res
      .status(200)
      .json({ message: "All todos were deleted succefully!" });
  } catch (err) {
    return res.status(404).json({ messsage: err.message });
  }
}

export default delete_todo;
