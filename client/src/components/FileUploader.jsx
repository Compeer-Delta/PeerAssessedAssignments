import React from 'react'
import { useState } from 'react';
import { render } from 'react-dom';

function FileUploader(props, uploadType) {


    const [file, setFile] = useState({fileName:'', fileContent:'' });
    const [formattedData, setFormattedData] = useState([]);

    const handleFileChange = e => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.readAsText(file);
//         reader.onload = () => {
//             setFile({fileName: file.name, fileContent: reader.result});
           
//   if ((((fileContent.split(/\n/))[0]).split(",")).length() == 4) //checks if its formatted in account data
//            if (props.uploadType === "modules")
//             {
//                 props.UploadedData((reader.result).split(","))
//                 console.log("in");
//             }
//             else if (props.uploadType === "accounts")
//             {
//                 if ((((((reader.result).split(/\n/))[0]).split(",")).length == 5))
//                 {
//                     console.log((((reader.result).split(/\n/))[0]).split(","))
                  
//                     props.UploadedData(((reader.result).split(/\n/)[0]).split(","))
                    
//                 }
//                 else
//                 { console.log("error with size of row not equal to 4" + ((((reader.result).split(/\n/))[0]).split(",")))}

//             }

//         }
//         reader.onerror= () => {
//  		console.log("file error", reader.error)
//         }
        
    }
   
    return (
        <div>
            <input type="file" onChange={handleFileChange} ></input>
            <br/><br/>
        </div>
    )
  
}
export default FileUploader