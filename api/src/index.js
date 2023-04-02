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
import submissionRoutes from "./routes/submission.js";

const app = express();

app.use(express.json(), bodyParser.json(), cors());

//routes
app.use(
  userRoutes,
  moduleRoutes,
  notificationRoutes,
  assignmentRoutes,
  adminRoutes,
  submissionRoutes
);

app.get("/", (req, res) => {
  res.status(200).send("COMPEER API is live");
});

//connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_SECRET, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`listening on ${PORT}`);
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
