//created by gc436
//run with npm run dev
import { config } from "dotenv";
config();
const { DB_SECRET, PORT } = process.env;
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
// import routes
import userRoutes from "./routes/user.js";
import moduleRoutes from "./routes/module.js";
import notificationRoutes from "./routes/notifications.js";
import assignmentRoutes from "./routes/assignment.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json(), cors());

//routes
app.use(
  userRoutes,
  moduleRoutes,
  notificationRoutes,
  assignmentRoutes,
  adminRoutes
);

app.get("/", (req, res) => {
  res.send("COMPEER API is live");
});

//connect to database
mongoose.set("strictQuery", false);
mongoose.connect(DB_SECRET, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log(`listening on ${PORT}`);
  app.listen(PORT);
});
