import React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import '../styles/uploader.css';


function StudentFileUploader(props) {

    const [file, setFile] = useState({});
    const [assignment, setAssignmentDetails] = useState({});

    const [timeLeft, setTimeLeft] = useState();
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef(null);
    const aDetails = useRef(null);
    const fDetails = useRef(null);

    const params = useParams();
    const location = useLocation();

    const moduleCode = params.id;
    const assignmentId = params.aid;
    const moduleId = location.state.modId;

    let session = {
        token: ReactSession.get("token"),
        accType: ReactSession.get("accType"),
        email: ReactSession.get("email"),
        inst: ReactSession.get("inst"),
        uid: ReactSession.get("uid")
    };;

    const handleFile = function(e) {
        setFile(e[0]);
        console.log("FILE CHANGE");
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
    
    //QOL to show how much time is left to upload to the user
    const calcTimeLeft = function(date) {
        // let dateArray = date.split(" ");

        // let currDate = format(new Date(), "dd-mm-yy");
        // let dueDate = format(new Date(dateArray[1].trim()), "dd-mm-yy");

        // console.log(currDate.getTime());
    };

    //Commit the file to the DB, and redirect
    const submitFile = async () => {
        if(file) {
            const fr_submit = `http://localhost:8081/assignment/submit/`;

            const response = await fetch(fr, {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: ReactSession.get("token"),
                },
                body: JSON.stringify({
                    userId: session.uid,
                    moduleId: moduleId,
                    assignmentId: assignmentId,
                    binData: file
                }),
            });

            const data = await response.json();
            console.log(data); //For Debug only

            //Needs to redirect back to the assignment page (i.e. /modules/ABCDxxxx)
            //Submit Work to change to View Submission?

        } else {
            //Needs to throw an error
            console.log("ERR: no file, see here: ", file);
        }
    };

    //Page Loading single-calls
    useLayoutEffect(() => {
        const getAssignmentDetails = async () => {
            const fr = `http://localhost:8081/assignment/${moduleId}/${assignmentId}`;

            const response = await fetch(fr, {
                method: "GET",
                headers: {
                Accept: "application/json",
                        "Content-Type": "application/json",
                Authorization: "Bearer " + ReactSession.get("token"),
                }
            });

            const data = await response.json();
            setAssignmentDetails(data);
        }

        getAssignmentDetails();
    }, []);
    
    return (
        // {!isStudent ? (<></>):(<></>)}
        <div id="uploadContainer">
            
            <br></br>
            <div id="assignmentDetails" ref={aDetails}>

            <h1><b>{assignment.title}</b></h1>
            <br></br>
            <b>Set:</b>{assignment.startDate} 
            <br></br>
            <b>Due:</b>{assignment.endDate}
            <br></br>
            </div>

            <br></br>

            <form id="uploadForm" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="uploadInput" onChange={handleChange}/>
                <label id="uploadLabel" hmtlfor="uploadInput" className={dragActive ? "drag-active" : "" }>
                    <div>
                        <p>Drag and drop your work or</p>
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
            <button id="submitButton" role="button" onClick={submitFile}>Submit Work</button>
        </div> 
    )
}

export default StudentFileUploader