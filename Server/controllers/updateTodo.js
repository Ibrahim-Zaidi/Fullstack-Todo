import sequelize_ from "../configue/db.js";

async function updateTodo(req, res) {
  const { content, done, id } = req.body;
  const { user_id } = req.user;

  console.log(content, done, id);

  try {
    if (!content) throw new Error("please add something");

    const todo_ = sequelize_.query(
      "UPDATE todos SET inputVal = :content , done = :done WHERE user_id = :user_id AND id = :id ",
      {
        replacements: { user_id, id, content, done },
        raw: true,
      }
    );

    return res
      .status(200)
      .json({ message: "todo updated succefully !", todo: todo_ });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

export default updateTodo;
