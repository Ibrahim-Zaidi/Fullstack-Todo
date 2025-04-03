import { Router } from "express";
import register from "../controllers/registerController.js";
import login from "../controllers/loginController.js";

const general_routes = Router();

general_routes.get("/", (req, res) => {
  res.send("this is the main page");
});

general_routes.post("/register", register);
general_routes.post("/login", login);

export default general_routes;
