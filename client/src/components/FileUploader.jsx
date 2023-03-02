import React from 'react'
import { useState } from 'react';
import { render } from 'react-dom';

function FileUploader(props, uploadType) {


    const [file, setFile] = useState({fileName:'', fileContent:'' });
    const [formattedData, setFormattedData] = useState([]);
    const handleFileChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setFile({fileName: file.name, fileContent: reader.result});
            console.log(file);
 /// if ((((fileContent.split(/\n/))[0]).split(",")).length() == 4) //checks if its formatted in account data
           if (uploadType === "modules")
            {
                props.UploadedData((reader.result).split(","))
            }
            else if (uploadType === "accounts")
            {
                if ((((((reader.result).split(/\n/))[0]).split(",")).length() == 4))
                {
                    {props.UploadedData((((reader.result).split(/\n/))).split(","))}
                }
                else
                { console.log("error with size of row not equal to 4")}

            }

        }
        reader.onerror= () => {
 		console.log("file error", reader.error)
        }
        
    }
   
    return (
        <div>
            
            
            <input type="file" onChange={handleFileChange} ></input>
            <br/><br/>
 
        </div>
    )
  
}
export default FileUploader