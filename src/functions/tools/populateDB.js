/* CSV to MongoDB Population */

const papaparse = require('papaparse'); //import Papa from "papaparse" <- Papaparse must be installed via npm
const mongoose = require('mongoose');

//the function to populate the database, file parameter to pass the .csv used
function populateDatabase(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data) //TODO: Change to MongoDB query to insert
      },
    });
  }

module.exports = populateDatabase