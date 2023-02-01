require("dotenv").config();
const { DBtoken } = process.env;
const express = require("express");
const app = express();
const { connect } = require("mongoose");

const PORT = 8080;
//base
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/demo", (req, res) => {
  res.send("Something Whatever");
});
//connect to database
connect(DBtoken).then(() => {
  console.log(`listening on ${PORT}`);
  app.listen(PORT);
});
