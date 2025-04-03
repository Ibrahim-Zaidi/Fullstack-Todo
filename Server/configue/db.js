import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize_ = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
  }
);

try {
  await sequelize_.authenticate();
  console.log("connected");
} catch (err) {
  console.log(err.message);
}

export default sequelize_;
