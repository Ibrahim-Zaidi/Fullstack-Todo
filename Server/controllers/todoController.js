import pool from "../model/db.js";
import "dotenv/config";
import {
  deleteAllQuery,
  deleteTodoQuery,
  getAllQuery,
  getOneTodoQuery,
  setTodoQuery,
  updateTodoQuery,
} from "../model/queries.js";

export async function getTodos(req, res) {
  try {
    pool.query(getAllQuery, (error, results) => {
      if (error) throw new Error(error);

      res.status(200).send(results.rows);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getOneTodo(req, res) {
  const id = parseInt(req.params.id);

  try {
    pool.query(getOneTodoQuery, [id], (error, results) => {
      if (error) throw new Error(error);

      if (!results.rows.length)
        res
          .status(404)
          .json({ message: "there is no item by this id of " + id });

      res.status(200).send(results.rows);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function setTodos(req, res) {
  try {
    const { inputval, done } = req.body;

    pool.query(setTodoQuery, [inputval, done], (error, results) => {
      if (error) throw new Error(error);

      res.status(200).json(results.rows);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function deleteTodo(req, res) {
  const id = parseInt(req.params.id);

  try {
    pool.query(getOneTodoQuery, [id], (error, results) => {
      if (error) throw new Error(error);

      if (!results.rows.length)
        res
          .status(404)
          .json({ message: "there is no item by this id of " + id });

      pool.query(deleteTodoQuery, [id], (error, result) => {
        if (error) throw new Error(error);

        res.status(200).json(result.rows);
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function updateTodo(req, res) {
  const { inputval, done } = req.body;
  const id = parseInt(req.params.id);

  try {
    pool.query(updateTodoQuery, [inputval, done, id], (error, result) => {
      if (error) throw new Error(error);

      res.status(200).json(result.rows);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function deleteTodos(req, res) {
  try {
    pool.query(deleteAllQuery, (error, result) => {
      if (error) throw new Error(error);

      res.status(200).json(result.rows);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
