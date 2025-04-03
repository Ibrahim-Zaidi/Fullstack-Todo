import sequelize_ from "../configue/db.js";
import { DataTypes } from "sequelize";

const users = sequelize_.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [5, 15],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

async function sync_table() {
  try {
    await users.sync({ alter: true });
    console.log("users table is connected");
  } catch (err) {
    console.log(err.message);
  }
}

sync_table();

export default users;
