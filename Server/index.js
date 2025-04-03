import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import general_routes from "./routes/generalRoute.js";
import auth_routes from "./routes/authRoute.js";
import "dotenv/config";
import errorHanlder from "./middlwares/errorMiddleware.js";

const app = express();

//app middlwares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(errorHanlder);

// routes

app.use("/", general_routes);
app.use("/main", auth_routes);

//starting the server

app.listen(process.env.SERVER_PORT, () => {
  console.log("server is running on " + process.env.SERVER_PORT);
});
