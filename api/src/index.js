import { config } from "dotenv";
config();
//MongoDB Token
const { DBtoken } = process.env;
import { connect } from "mongoose";
//express handling
import express from "express";
const app = express();
import cors from "cors";
//default port
const PORT = 8080;

//base
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/student", (req, res) => {
  res.send("Something Whatever");
});

//connect to database
connect(DBtoken).then(() => {
  console.log(`listening on ${PORT}`);
  app.listen(PORT);
});
