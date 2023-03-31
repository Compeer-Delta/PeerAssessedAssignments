//created by gc436
//run with npm run dev
import { config } from "dotenv";
config();
const { DB_SECRET, PORT } = process.env;
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import routes
import userRoutes from "./routes/user.js";
import moduleRoutes from "./routes/module.js";
import notificationRoutes from "./routes/notifications.js";
import assignmentRoutes from "./routes/assignment.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json(), bodyParser.json(), cors());

//routes
app.use(
  userRoutes,
  moduleRoutes,
  notificationRoutes,
  assignmentRoutes,
  adminRoutes
);

app.get("/", (req, res) => {
  res.status(200).send("COMPEER API is live");
});

app.get("/battery", (req, res) => {
  res.send("battery is live");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User created" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ message: err.message });
  }
});
/*
  username: "test";
  password: "testing";
  firstname: "bob";
  surname: "smith";
  email: "bob@email.com";
  institution: "university of test";
  role: "student";*/
//connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_SECRET, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`listening on ${PORT}`);
    app.listen(PORT);
  });
