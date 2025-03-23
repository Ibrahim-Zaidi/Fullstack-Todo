import express from "express";
import bodyParser from "body-parser";
import mainRoute from "./routes/mainRoute.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5100;
app.use(cors());
app.use(bodyParser.json());

app.use("/main", mainRoute);

app.listen(port, () => {
  console.log("the server is runing on port " + port);
});
