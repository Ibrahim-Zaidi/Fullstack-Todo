import sequelize_ from "../configue/db.js";
import todos from "../models/todoModel.js";

async function deleteOneTodo(req, res) {
  try {
    const {
      user: { user_id },
      params: { id },
    } = req;

    let todo_id = id;

    const todos_ = await todos.findAll({
      where: {
        user_id: user_id,
      },
      raw: true,
    });

    if (!todos_) throw new Error("no todos with that user id !");

    await sequelize_.query("DELETE FROM todos WHERE id = :todo_id", {
      replacements: { todo_id },
    });

    return res
      .status(200)
      .json({ message: "todo has been deleted succefully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export default deleteOneTodo;
