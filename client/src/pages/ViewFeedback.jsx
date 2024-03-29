/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Gregory Clews
 */
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { acceptedFeedback } from "../functions/api/submissionAPI.js";
//imports

function ViewFeedback() {

  //recievedFeedback contains information to be displayed in ViewFeedback specified styling
  const [recievedFeedback, setRecievedFeedback] = useState([
    {
      assignmentTitle: "Lorem Ipsum Essay part 2",
      markedBy: "Hathan Khatkar",
      mark: "10/10",
      writtenFeedback:
        " Well done \n Improve your essay in these areas: \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      viewFeedback: false,
    },
    {
      assignmentTitle: "Deep learning coding tasks",
      markedBy: "Hathan Khatkar1",
      mark: "10/10",
      writtenFeedback: " Well done",
      viewFeedback: false,
    },
    {
      assignmentTitle: "Java Object oriented programming class assignment",
      markedBy: "Hathan Khatkar2",
      mark: "10/10",
      writtenFeedback:
        " Great job \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      viewFeedback: false,
    },
    {
      assignmentTitle: "Lorem Ipsum Essay",
      markedBy: "Hathan Khatkar3",
      mark: "10/10",
      writtenFeedback: " Needs improvement",
      viewFeedback: false,
    },
  ]);

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };
  //session data

  //use effect renders each time the page is updated for recieving up to date information from the database
  useEffect(() => {
    //API call to getAcceptedFeedback which will return all feedback that has been approved by a teacher
    const getAcceptedFeedback = async () => {
      const response = await acceptedFeedback(
        session.uid,
        ReactSession.get("token")
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setRecievedFeedback(data);
      }
    };
    getAcceptedFeedback();
  }, []);

  // toggle the viewFeedback property of the feedback that was clicked on the page to show/hide the feedback
  function toggleFeedback(view) {
    let feedbackIndex = 0;
    let isFeedbackFound = false;
    let newArr = [...recievedFeedback];

    // find the index of the feedback that was clicked
    newArr.forEach((feedback, index) => {
      if (
        feedback.assignmentTitle === view.assignmentTitle &&
        feedback.markedBy === view.markedBy &&
        feedback.mark === view.mark &&
        feedback.writtenFeedback === view.writtenFeedback
      ) {
        isFeedbackFound = true;
        feedbackIndex = index;
        return;
      }
    });

    // toggle the viewFeedback property of the feedback that was clicked
    if (isFeedbackFound) {
      newArr[feedbackIndex].viewFeedback = !newArr[feedbackIndex].viewFeedback;
      setRecievedFeedback(newArr);
    }
  }

  // toggle the text of the button to show/hide the feedback
  function toggleButtonText(view) {
    return view.viewFeedback;
  }

  return (
    <>
      {/*Page title */}
      <h1 className=" font-Dosis md:ml-80 ml-28 text-3xl 2xl:w-[1000px] md:w-[600px] w-[200px] text-slate-600 font-semibold dark:text-white rounded-md pb-4">
        {" "}
        Your Feedback:
      </h1>
      {/* Maps all feedback taking each instance and separately rendering them using its data properties: displays assignment title, marker, mark and feedback*/}
      {recievedFeedback.map((fb) => (
        <div className=" ml-16 xl:ml-80 2xl:w-[1200px] md:w-[600px] sm:w-[538px] w-[280px]  bg-slate-300 dark:bg-zinc-800 mb-2 rounded break-normal">
          <h1 className="ml-10 pt-4  text-xl xl:text-3xl md:w-[600px] w-[240px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis ">
            {" "}
            {fb.assignmentTitle}{" "}
          </h1>
          <h1 className="ml-10 py-1  text-md xl:text-xl md:w-[600px] w-[280px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis ">
            {" "}
            marked by {fb.markedBy}
          </h1>
          <h1 className="font-Dosis ml-10  text-l md:w-[600px] w-[280px] text-blue-600 font-semibold dark:text-white rounded-md ">
            {" "}
            Given mark / grade: {fb.mark}
          </h1>
           {/* For each instance, a button is displayed which will toggle whether the feedback is shown or hidden */}
          <button
            onClick={() => toggleFeedback(fb)}
            className="mt-2 mb-2 font-Dosis ml-10 text-l py-2 px-2 text-slate-600 font-semibold dark:text-white dark:bg-zinc-600 rounded-md bg-slate-50"
          >  
            {toggleButtonText(fb) === true ? (
              <p>Hide Feedback</p>
            ) : (
              <p> Show Feedback</p>
            )}
          </button>
           {/* displays feedback under general submission details if toggled to true */}
          {fb.viewFeedback === true ? (
            <div className="bg-slate-200 overflow-x-auto">
              <p className="font-Dosis ml-10  text-xl w-[700px] font-semibold  text-green-600 ">
                {" "}
                Your Feedback:
              </p>
              <p className=" whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[1000px] text-slate-600 dark:text-zinc-800 font-semibold  rounded-md">
                {fb.writtenFeedback}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}

export default ViewFeedback;
