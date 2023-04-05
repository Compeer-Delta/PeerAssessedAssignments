/**
 * Credit:
 * Functionality: Hathan Khatkar
 */
import React from "react";
import { useState } from "react";

function FileUploader(props, uploadType) {
//handles the format in which data is returned from an uploaded file
  const [file, setFile] = useState({ fileName: "", fileContent: "" });

  //triggers every time the file is changed
  const handleFileChange = (e) => {
    //reads the file information
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFile({ fileName: file.name, fileContent: reader.result });

      //the data will be formatted differently for manage modules and manage accounts
      if (props.uploadType === "modules") {
        //for modules the data can be read and return as is, being already in  the format we need
        props.UploadedData(reader.result.split(","));
      } else if (props.uploadType === "accounts") {
        //for accounts we need to check if the csv file contains 5 fields
        if (reader.result.split(/\n/)[0].split(",").length == 5) {
          console.log(reader.result.split(/\n/)[0].split(","));

          const returnArray = [];
          const duplicateCheckArray = [];
          //returns in format [[username1, password1, firstname1, lastname1, account1], [username2, password2, firstname2, lastname2, account2], [...]]

          //checks for duplicate information sent in the csv file so it could be filtered out and returned in a filtered array
          for (let i = 0; i < reader.result.split(/\n/).length; i++) {
            if (
              !duplicateCheckArray.includes(
                reader.result.split(/\n/)[i].split(",")[0]
              )
            ) {
              returnArray.push(reader.result.split(/\n/)[i].split(","));
            }

            duplicateCheckArray.push(
              reader.result.split(/\n/)[i].split(",")[0]
            );
          }
          //return uploaded file data to create modules
          props.UploadedData(returnArray);
        } else {
          console.log(
            "error with size of row not equal to 4" +
              reader.result.split(/\n/)[0].split(",")
          );
        }
      }
    };
  };

  return (
    <div>
      <input id="fileUpload" type="file" onChange={handleFileChange}></input>
      <br />
      <br />
    </div>
  );
}

export default FileUploader;
