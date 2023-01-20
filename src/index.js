require("dotenv").config();
const { DBtoken } = process.env;
const { connect } = require("mongoose");

(async () => {
    await connect(DBtoken).catch(console.error);
  })();