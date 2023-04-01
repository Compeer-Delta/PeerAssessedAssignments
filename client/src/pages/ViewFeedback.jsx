// This page is for students to view feedback on their assignments
import React from "react";
import Works from "../components/Works";
import StudentView from "../pages/StudentView";
import HeroSection from "../components/HeroSection";
import { useState } from "react";
function ViewFeedback() {
  const [recievedFeedback, setRecievedFeedback] = useState([
    {assignmentTitle:"Lorem Ipsum Essay part 2", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done \n Improve your essay in these areas: \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", viewFeedback:false},
    {assignmentTitle:"Deep learning coding tasks", markedBy:"Hathan Khatkar1", mark:"10/10", writtenFeedback:" Well done", viewFeedback:false},
    {assignmentTitle:"Java Object oriented programming class assignment", markedBy:"Hathan Khatkar2", mark:"10/10", writtenFeedback:" Great job \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", viewFeedback:false},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar3", mark:"10/10", writtenFeedback:" Needs improvement", viewFeedback:false}]);
  //read all feedback where the feedback is to a student and that feedback has been approved=true

  const [viewFeedback, setViewFeedback] = useState(false);
  const [foundClicked, setFoundClicked] = useState(false);

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
