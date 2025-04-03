import { Router } from "express";
import auth from "../middlwares/authMiddleware.js";
import add_todo from "../controllers/addTodo.js";
import get_todos from "../controllers/getTodos.js";
import delete_todos from "../controllers/deleteTodos.js";
import deleteOneTodo from "../controllers/deleteOneTodo.js";
import check_auth_route from "../controllers/checkAuth.js";

const auth_routes = Router();

auth_routes.get("/moha", auth, (req, res) => {
  res.status(200).send(req.user);
});

auth_routes.get("/me", auth, check_auth_route);
auth_routes.get("/", auth, get_todos);
auth_routes.post("/add", auth, add_todo);
auth_routes.delete("/deleteAll", auth, delete_todos);
auth_routes.delete("/delete/:id", auth, deleteOneTodo);
// auth_routes.put("/update", auth, update_todo);

export default auth_routes;
