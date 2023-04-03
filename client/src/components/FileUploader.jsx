// This component is used to upload files to the server
import React, { useCallback, useState } from "react";
import { render } from "react-dom";

function FileUploader(props, uploadType) {
  const [file, setFile] = useState({ fileName: "", fileContent: "" });

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setFile({ fileName: file.name, fileContent: reader.result });

        const lines = reader.results.split(/\n/);

        //  If modules are being uploaded then the file is split by commas and the first line is removed
        if (props.uploadType === "modules") {
          props.UploadedData(reader.result.split(","));
          console.log("modules uploaded");
          return true;
        }

        // If accounts are being uploaded then the file is split by new lines and the first line is removed
        if (props.uploadType === "accounts") {
          const columns = lines[0].split(",");

          if (columns.length === 5) {
            const returnArray = [];
            const duplicateCheckArray = [];

            // Itterate through each line and check if the username is already in the array
            // Format: [[username1, password1, firstname1, lastname1, account1], [username2, password2, firstname2, lastname2, account2], [...]]
            lines.forEach((line) => {
              const rowData = line.split(",");
              const username = rowData[0];

              // If username is not in array, add it
              if (!duplicateCheckArray.includes(username)) {
                returnArray.push(rowData);
                duplicateCheckArray.push(username);
              }
            });

            props.UploadedData(returnArray);
            return true;
          }

          console.log("Error: Row size not 5" + columns);
          return false;
        }
      };
    },
    [props.uploadType, props.UploadedData]
  );

  return (
    <div>
      <label htmlFor="fileUpload">Upload file</label>
      <input
        id="fileUpload"
        type="file"
        onChange={handleFileChange}
        file={file}
      ></input>
      <br />
      <br />
    </div>
  );
}

export default FileUploader;
