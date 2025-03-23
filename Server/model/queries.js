import "dotenv/config";

export const getAllQuery = `SELECT * FROM ${process.env.DATABASE_TABLE};`;

export const getOneTodoQuery = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE id = $1`;

export const setTodoQuery = `INSERT INTO ${process.env.DATABASE_TABLE} (inputval , done) VALUES ($1 , $2) RETURNING *;`;

export const deleteTodoQuery = `DELETE FROM ${process.env.DATABASE_TABLE} WHERE id = $1`;

export const deleteAllQuery = `TRUNCATE ${process.env.DATABASE_TABLE}`;

export const updateTodoQuery = `UPDATE ${process.env.DATABASE_TABLE} SET inputval = $1  , done = $2 WHERE id = $3;`;
