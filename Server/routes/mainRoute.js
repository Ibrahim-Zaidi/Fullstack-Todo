import { Router } from "express";
import {
  deleteTodo,
  deleteTodos,
  getOneTodo,
  getTodos,
  setTodos,
  updateTodo,
} from "../controllers/todoController.js";

const mainRoute = Router();

mainRoute.route("/").delete(deleteTodos).get(getTodos).post(setTodos);
mainRoute.route("/:id").delete(deleteTodo).get(getOneTodo).put(updateTodo);

export default mainRoute;
