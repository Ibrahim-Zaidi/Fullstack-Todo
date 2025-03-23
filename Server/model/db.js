import pg from "pg";
import "dotenv/config";
// const { pool } = pg;

const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

export default pool;
