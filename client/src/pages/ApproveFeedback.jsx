/**
 * Credit:
 * Functionality: Hathan Khatkar
 */
import React from "react";
import { useState } from "react";

function ApproveFeedback() {

  //all feedback where approved = "pending", to be displayed in ApproveFeedback styling
  const [pendingFeedback, setPendingFeedback] = useState([
    {
      title: "A* Algorithm Assignment",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "5",
      approved: "pending",
      id: 1,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ",
    },
    {
      title: "Class work 3 submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "2",
      approved: "pending",
      id: 2,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit ",
    },
    {
      title: "Class work 2 submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "12",
      approved: "pending",
      id: 3,
      feedback: "Good job",
    },
    {
      title: "Introduction to AI submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "3",
      approved: "pending",
      id: 4,
      feedback:
        "Well done\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
    },
    {
      title: "RE A* Algorithm Assignment",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "6",
      approved: "pending",
      id: 5,
      feedback: "Needs improvement",
    },
    {
      title: "RE Class work 3 submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "3",
      approved: "pending",
      id: 6,
      feedback: "Well done",
    },
    {
      title: "RE Class work 2 submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "1",
      approved: "pending",
      id: 7,
      feedback: "Well done",
    },
    {
      title: "RE Introduction to AI submission",
      markedBy: "Hathan Khatkar",
      submissionBy: "Gregory Clews",
      gradeGiven: "7",
      approved: "pending",
      id: 8,
      feedback: "Well done",
    },
  ]);

  var i = 0;
  var stopcount = false;
  const [foundClicked, setFoundClicked] = useState(false);

  //function that will be called when feedback is either accepted or rejected. Gets the button clicked and updates the fields value with the passed teacherApproved value
  function toggleFeedback(view, teacherApproved) {
    //creates a new array duplicating pendingFeedback and checks through array for index in which the button is pressed
    let newArr = [...pendingFeedback];
    newArr.forEach(findClickedFeedbackButton, view);
    //i will return the index of the button field and update that indexes approved from pending to either accepted or rejected

    newArr[i].approved = teacherApproved;
    setPendingFeedback(newArr);
    i = 0;
    stopcount = false;
    console.log(pendingFeedback);
    console.log("new arr " + newArr[0].approved);
  }

  //function used in toggle feedback for finding the index i that was updated
  function findClickedFeedbackButton(arr, index) {
    console.log(arr);
    console.log(this);

    if (arr.id == this.id) {
      setFoundClicked(true);
      stopcount = true;
      console.log("out" + foundClicked);
    } else {
      console.log("in");

      if (stopcount == false) {
        i = i + 1;
      }

      console.log("i" + i);
    }
  }


  return (
    <>
      {/* Page title*/}
      <div className="xl:ml-80 xl:mr-80 ml-24  font-Dosis text-2xl sm:text-3xl font-bold py-2 dark:text-zinc-200">
        Approve student feedback
      </div>
      <div className=" overflow-x-scroll">
        {/* Table for displaying all feedback fields */}
        <table className="table-fixed md:w-[1200px] w-full  ml-16 text-sm text-left text-gray-500 dark:text-zinc-100  xl:ml-80">
          {/* Table header contains assignment title, submission by, marked by, grade and a separate column for accept/ reject buttons */}
          <thead className="text-s text-gray-700 font-Dosis  bg-slate-50  dark:text-white border-2 border-slate-900 dark:border-white dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 border border-width-10">
                Assignment Title
              </th>
              <th className="px-6 py-3 border border-width-10">
                submission by
              </th>
              <th className="px-6 py-3 border border-width-10">marked by</th>
              <th className="px-6 py-3 border border-width-10">grade given</th>
              <th className="px-6 py-3 border border-width-10">
                Send to student ?
              </th>
            </tr>
          </thead>
          <br></br>
          {/* all fields */}
          <tbody>
            {pendingFeedback.map((assignment) =>
              assignment.approved == "pending" ? (
                <>
                  <tr className="  dark:bg-zinc-800 dark:border-white hover:bg-slate-200 bg-slate-100 border-2 border-slate-900">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace dark:text-white"
                    >
                      {assignment.title}
                    </th>
                    <td className="px-6 py-4">{assignment.submissionBy}</td>
                    <td className="px-6 py-4">{assignment.markedBy}</td>
                    <td className="px-6 py-4">{assignment.gradeGiven}</td>
                    {/* column for accept / reject feedback calls toggleFeedback when clicked */}
                    <td className="px-3 md:px-6 py-4 text-center ">
                      <button
                        onClick={() => toggleFeedback(assignment, "yes")}
                        className=" font-Dosis text-blue-100 text-l bg-green-500 border-black md:px-6 px-1 py-1 rounded-3xl hover:bg-green-200 hover:text-green-800 mb-3"
                      >
                        <p>Approve</p>
                      </button>
                      <button
                        onClick={() => toggleFeedback(assignment, "no")}
                        className="font-Dosis text-blue-100 text-l bg-red-500 border-black  md:px-8 px-2 py-1 rounded-3xl hover:bg-red-200 hover:text-red-800"
                      >
                        <p>Reject</p>
                      </button>
                    </td>
                  </tr>
                  {/* After each row, the feedback from the peer is displayed below in order to give it enough space to be read*/}
                  <div className="mb-5 sm:w-[1200px] w-[400px] bg-slate-200">
                    <p className="font-Dosis ml-10  text-xl w-[700px] font-semibold  text-green-600 ">
                      {" "}
                      Given Feedback:
                    </p>
                    <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[1000px] text-slate-600 dark:text-zinc-800 font-semibold  rounded-md">
                      {assignment.feedback}
                    </p>
                  </div>
                </>
              ) : assignment.approved == "yes" ||
                assignment.approved == "no" ? (
                <></>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApproveFeedback;
