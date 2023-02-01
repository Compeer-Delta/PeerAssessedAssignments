import React from 'react'
import { useState, useRef } from 'react';
import { render } from 'react-dom';


function FileUploader(props) {

    const [file, setFile] = useState({fileName:'', fileContent:'' });
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);

    const handleFile = e => {
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
        
        console.log(e); //for testing
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
    )
}

export default FileUploader