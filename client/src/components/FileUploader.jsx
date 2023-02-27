import React from 'react';
import { useState, useRef, useEffect } from 'react';
import '../styles/uploader.css';


function FileUploader(props) {

    const [file, setFile] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);
    const fDetails = useRef(null);
    const userData = JSON.parse(sessionStorage.getItem('loginSessionData'));

    const handleFile = function(e) {
        setFile(e[0]);
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

    //Handles any change w/in the upload area
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    //Handles button/label click
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const removeFile = () => {
        if(file != {}) {
            setFile({});
        }
    };

    //Page Loading single-calls
    useEffect(() => {
        const onPageLoad = () => {

            //Debugging
            console.log("Loaded")
            // //console.log(userData);
        };

        if(document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);
    
    return (
        // {!isStudent ? (<></>):(<></>)}
        <div id="uploadContainer">
            <form id="uploadForm" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="uploadInput" onChange={handleChange}/>
                <label id="uploadLabel" hmtlfor="uploadInput" className={dragActive ? "drag-active" : "" }>
                    <div>
                        <p>Drag and drop your file or</p>
                        <button className="uploadButton" onClick={onButtonClick}>Upload a file</button>
                    </div>
                </label>
                { dragActive && <div id="dragElement" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>

            <br></br>

            <div id="fileDetails" ref={fDetails}>
            <i>{file.name}</i>
            <br></br>
            </div>

            <br></br>

            <button id="clearButton" role="button" onClick={removeFile}>Remove File</button>
            <br></br>
            <button id="submitButton" role="button">Submit File</button>
            <br></br>
        </div> 
    )
}

export default FileUploader