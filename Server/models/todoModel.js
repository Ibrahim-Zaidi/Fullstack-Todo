import { DataTypes } from "sequelize";
import sequelize_ from "../configue/db.js";

const todos = sequelize_.define(
  "todos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inputval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "todos",
  }
);

async function todos_table() {
  try {
    await todos.sync({ alter: true });
    console.log("todos is connected");
  } catch (error) {
    console.log(error.message);
  }
}

todos_table();

export default todos;
