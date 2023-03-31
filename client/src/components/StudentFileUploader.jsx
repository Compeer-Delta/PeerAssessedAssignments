import { useState, useRef, useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ReactSession } from "react-client-session";
import "../styles/uploader.css";

function StudentFileUploader() {
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const params = useParams(); // Get the module code and assignment id from the URL
  const location = useLocation();

  const modCode = params.id
  const assignmentId = params.aid
  const modId = location.state.modId; // Get the module id from the state

  const uid = ReactSession.get("uid"); // Get the user id and token from the session
  const token = ReactSession.get("token");

  const inputRef = useRef(); // Reference to the file input element
  const aDetailsRef = useRef(); // Reference to the assignment details element
  const fDetailsRef = useRef(); // Reference to the file details element

    // Submit file to backend for processing
    const submitFile = async () => {
        if (file) {
            const fr_submit = `http://localhost:8081/assignment/submit/`;
            const formData = new FormData();
            formData.append("userId", uid);
            formData.append("moduleId", modId);
            formData.append("assignmentId", assignmentId);
            formData.append("binData", file);

            const response = await fetch(fr_submit, {
                method: "POST",
                headers: {
                Accept: "application/json",
                Authorization: token,
                },
                body: formData,
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

    // Handle file change
    const handleFile = (e) => {
        const file = e[0];
        setFile(file);
        console.log("FILE CHANGE");
        //console.log(file);
    };

    // Handle drag and drop events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    };

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // Handle button click to open file dialog
    const handleButtonClick = () => {
        inputRef.current.click();
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
        if(file != null) {
            setFile(null);
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
    // const submitFile = async () => {
    //     console.log(file);

    //     if(file) {
    //         const fr_submit = `http://localhost:8081/assignment/submit/`;

    //         const response = await fetch(fr_submit, {
    //             method: "POST",
    //             headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             Authorization: ReactSession.get("token"),
    //             },
    //             body: JSON.stringify({
    //                 userId: session.uid,
    //                 moduleId: moduleId,
    //                 assignmentId: assignmentId,
    //                 // binData: file
    //             }),
    //             file: file,
    //         });

    //         const data = await response.json();
    //         console.log(data); //For Debug only

    //         //Needs to redirect back to the assignment page (i.e. /modules/ABCDxxxx)
    //         //Submit Work to change to View Submission?

    //     } else {
    //         //Needs to throw an error
    //         console.log("ERR: no file, see here: ", file);
    //     }
    // };

    //Page Loading single-calls
    useLayoutEffect(() => {
        const getAssignmentDetails = async () => {
            const fr = `http://localhost:8081/assignment/${modId}/${assignmentId}`;

            const response = await fetch(fr, {
                method: "GET",
                headers: {
                Accept: "application/json",
                        "Content-Type": "application/json",
                Authorization: "Bearer " + ReactSession.get("token"),
                }
            });

            const data = await response.json();
            setAssignment(data);
        }

        getAssignmentDetails();
    }, [modId, assignmentId, token]);

  return (
    <div id="uploadContainer">
      <br />
      <div id="assignmentDetails" ref={aDetailsRef}>
        {assignment ? (
          <>
            <h1><b>{assignment.title}</b></h1>
            <br />
            <b>Set:</b>{assignment.startDate} 
            <br />
            <b>Due:</b>{assignment.endDate}
            <br />
          </>
        ) : null} {/* If assignment is null, don't render anything */}
      </div>
      { /*File upload form with drag and drop functionality*/ }
      <form
        id="uploadForm"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      > 
        <input
          ref={inputRef}
          type="file"
          id="uploadInput"
          onChange={handleChange}
        />
        <label
          id="uploadLabel"
          htmlFor="uploadInput"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your work or</p>
            <button className="uploadButton" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="dragElement"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>

      <br />

      { /* File details */ }
      <div id="fileDetails" ref={fDetailsRef}>
        <i>{file ? file.name : ""}</i>
        <br />
      </div>

      <br />

      <button id="clearButton" role="button" onClick={removeFile}>
        Remove File
      </button>
      <br />
      <button id="submitButton" role="button" onClick={submitFile}>
        Submit Work
      </button>
    </div>
    );
}
export default StudentFileUploader
