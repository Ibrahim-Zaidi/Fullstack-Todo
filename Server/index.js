import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import general_routes from "./routes/generalRoute.js";
import auth_routes from "./routes/authRoute.js";
import "dotenv/config";


const app = express();
const port = process.env.PORT || 5000;
const allowedOirigins = ["http://localhost:5174", "http://localhost:5173"];

//app middlwares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOirigins,
    credentials: true,
  })
);

// routes

app.use("/", general_routes);
app.use("/main", auth_routes);

//starting the server

app.listen(port, () => {
  console.log("server is running on port " + port);
});
