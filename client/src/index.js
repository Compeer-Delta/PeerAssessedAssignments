import express from "express";
require("dotenv").config();
const { DBtoken } = process.env;
const { connect } = require("mongoose");
const app = express();
app.listen(5000)
(async () => {
    await connect(DBtoken).catch(console.error);
  })();