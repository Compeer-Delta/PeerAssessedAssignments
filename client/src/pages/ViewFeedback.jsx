// This page is for students to view feedback on their assignments
import Works from "../components/Works";
import StudentView from "../pages/StudentView";
import HeroSection from "../components/HeroSection";
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { acceptedFeedback } from "../functions/api/submissionAPI.js";

function ViewFeedback() {
  const [recievedFeedback, setRecievedFeedback] = useState([]);
  const [viewFeedback, setViewFeedback] = useState(false);
  const [foundClicked, setFoundClicked] = useState(false);

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };

  useEffect(() => {
    const getAcceptedFeedback = async () => {
      const response = await acceptedFeedback(
        session.uid, ReactSession.get("token")
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
        console.log("found");
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
      <h1 className=" font-Dosis md:ml-80 ml-28 text-3xl 2xl:w-[1000px] md:w-[600px] w-[200px] text-slate-600 font-semibold dark:text-white rounded-md pb-4">
        {" "}
        Your Feedback:
      </h1>
      {recievedFeedback.map((fb) => (
        <div className=" ml-16 xl:ml-80 2xl:w-[1200px] md:w-[600px] sm:w-[538px] w-[280px]  bg-slate-300 mb-2 rounded break-normal">
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
          <button
            onClick={() => toggleFeedback(fb)}
            className="mt-2 mb-2 font-Dosis ml-10 text-l py-2 px-2 text-slate-600 font-semibold dark:text-white rounded-md bg-slate-50"
          >
            {toggleButtonText(fb) === true ? (
              <p>Hide Feedback</p>
            ) : (
              <p> Show Feedback</p>
            )}
          </button>

          {fb.viewFeedback === true ? (
            <div className="bg-slate-200 overflow-x-auto">
              <p className="font-Dosis ml-10  text-xl w-[700px] font-semibold dark:text-white text-green-600 ">
                {" "}
                Your Feedback:
              </p>
              <p className=" whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[1000px] text-slate-600 font-semibold dark:text-white rounded-md">
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
