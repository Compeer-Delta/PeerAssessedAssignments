/* CSV to MongoDB Population */

const papaparse = require('papaparse'); //import Papa from "papaparse" <- Papaparse must be installed via npm

//EXAMPLE:
/* <input
        type="file"
        name="file"
        accept=".csv"
        onChange={popHandler}
        style={{ display: "block", margin: "10px auto" }}
/> */


//the popHandler to be placed within the file uploader element of the page (i.e. within onChange, onSubmit etc; see above)
const popHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data) //TODO: Change to MongoDB query to insert
      },
    });
}