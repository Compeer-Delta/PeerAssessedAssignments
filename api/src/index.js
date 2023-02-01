const express = require("express");
const app = express();

//base
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/demo", (req, res) => {
  res.send("Something Whatever");
});

app.listen(8080);
