import express from "express";
import { routes } from "./routes/index";
import { initializeDbConnection } from "./db";

const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
