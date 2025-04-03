import todos from "../models/todoModel.js";
import users from "../models/userModel.js";

async function add_todo(req, res) {
  try {
    const {
      body: { content, done },
      user: { user_id },
    } = req;

    const user = await users.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (user) {
      const new_todo = await todos.create({
        inputval: content,
        done: done,
        user_id: user_id,
      });
      return res.status(200).send(new_todo);
    }

    throw new Error("something went wrong");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export default add_todo;
