import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import works from '../data/works';


function FileUploader(props) {

    const [file, setFile] = useState({});
    const [assignment, setAssignmentDetails] = useState({});
    //useState({fileName:'', fileContent:'' });
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);
    const aDetails = useRef(null);
    const fDetails = useRef(null);

    const params = useParams();
    const userData = JSON.parse(sessionStorage.getItem('loginSessionData'));

    const handleFile = function(e) {
        {
        //HATHAN contrib:
        // const reader = new FileReader();
        // reader.readAsText(e[0]);
        // reader.onload = () => {
        
        //setFile({fileName: e[0].name, fileContent: reader.result});
        // console.log("UT: " + props.uploadType);
        // // if ((((fileContent.split(/\n/))[0]).split(",")).length() == 4) //checks if its formatted in account data
        // if (props.uploadType === "modules") {
        //         props.UploadedData((reader.result).split(","))
        // }
        // else if (props.uploadType === "accounts") {
        //     if ((((((reader.result).split(/\n/))[0]).split(",")).length == 5)) {
        //         {props.UploadedData(((reader.result).split(/\n/)))}
        //     }
        //     else { 
        //         console.log("error with size of row not equal to 4 : " +(((((reader.result).split(/\n/))[0]).split(",")).length) )
        //     }
        // }
        
        // }

        // reader.onerror= () => {
        //     console.log("file error", reader.error);
        // }
        //END HATHAN contrib.
        }

        setFile(e[0]);
        

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

    const getAssignmentDetails = function(id) {
        const worksArray = Object.values(works);

        for(let i = 0; i < worksArray.length; i++) {
            let w = worksArray[i];

            if(w.id == id) {
                return w;
            }
        }
    };

    //Page Loading single-calls
    useEffect(() => {
        const onPageLoad = () => {
            //Debugging

            console.log(params.id);
            setAssignmentDetails(getAssignmentsDetails(params.id));
            console.log(getAssignmentDetails(params.id));
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
        <div id="uploadContainer">
            <div id="assignmentDetails" ref={aDetails}>
            ASSIGNMENT DETAILS HERE
            </div>

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

            <div id="fileDetails" ref={fDetails}>
            FILE DETAILS HERE
            </div>
        </div> 
    )
}

export default FileUploader