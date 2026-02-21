const express = require("express");
const LogReqRes = require("./middlewares/logReqRes");
const mongoose = require("mongoose");
const UserRouterFromUserController = require("./routes/userRoute");
const app = express();

// connection to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/mvcPractice")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LogReqRes("log.txt"));

app.use("/api/v1/users", UserRouterFromUserController);

app.listen(6000, () => console.log("server is running on port:6000"));
