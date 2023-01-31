import React from 'react'
import { useState } from 'react';
import { render } from 'react-dom';


function FileUploader(props) {

 
    const [file, setFile] = useState({fileName:'', fileContent:'' });
    const [formattedData, setFormattedData] = useState([]);


    const handleFileChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setFile({fileName: file.name, fileContent: reader.result});
            
          {props.UploadedData(reader.result.split(","))}
        
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