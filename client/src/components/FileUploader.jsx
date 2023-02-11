import React from 'react'
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';


function FileUploader(props) {

    const [file, setFile] = useState({fileName:'', fileContent:'' });
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);
    const currentFileRef = useRef(null);

    const submissionID = useParams();
    const userData = JSON.parse(sessionStorage.getItem('loginSessionData'));

    //Debugging
    console.log(submissionID.id);
    console.log(userData);

    const handleFile = e => {
        {
        // const file = e[0];
        // const reader = new FileReader();
        // reader.readAsText(file);
        // reader.onload = () => {
        //     setFile({fileName: file.name, fileContent: reader.result});
            
        //   {props.UploadedData(reader.result.split(","))}
        
        // }
        // reader.onerror= () => {
        //     console.log("file error", reader.error)
        // }
        }

        const file = e[0];
        console.log(file); //Debugging

        

        //HATHAN contrib:
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
        
        setFile({fileName: file.name, fileContent: reader.result});
        console.log("UT: " + props.uploadType);
        // if ((((fileContent.split(/\n/))[0]).split(",")).length() == 4) //checks if its formatted in account data
        if (props.uploadType === "modules") {
                props.UploadedData((reader.result).split(","))
        }
        else if (props.uploadType === "accounts") {
            if ((((((reader.result).split(/\n/))[0]).split(",")).length == 5)) {
                {props.UploadedData(((reader.result).split(/\n/)))}
            }
            else { 
                console.log("error with size of row not equal to 4 : " +(((((reader.result).split(/\n/))[0]).split(",")).length) )
            }
        }
        
        }

        reader.onerror= () => {
            console.log("file error", reader.error);
        }
        //END HATHAN contrib.

        
        //GREG: Please put MongoDB queries for: object insert for the submittedFile, returning if user is part of this module, returning if there is a record of them submitting already.
        //(I will do the if statements and everything else)

        //If user is not part of this module, throw error
        //Else, check if user studies the module AND has not uploaded already
        //Submit file to the db etc.
        
    };

    //Handles drag/drop
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    //Handles button/label click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div id="uploadContainer">
            <form id="uploadForm" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="uploadInput" onChange={handleChange}/>
                <label id="uploadLabel" hmtlfor="uploadInput" className={dragActive ? "drag-active" : "" }>
                    <div>
                        <p>Drag and drop your work for submission or</p>
                        <button className="uploadButton" onClick={onButtonClick}>Upload a file</button>
                    </div>
                </label>
                { dragActive && <div id="dragElement" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
        </div> 
    )
}

export default FileUploader