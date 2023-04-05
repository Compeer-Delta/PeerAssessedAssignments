/**
 * Credit:
 * Functionality: Hathan Khatkar
 *
 */
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { getAssignmentInfo } from "../functions/api/assignmentAPI";
import { ReactSession } from "react-client-session";
//imports

function PeerManager(props) {

  //assignments variable contains the data that will be displayed using Peer Manager styling
  const [assignments, setAssignments] = useState([
    {
      title: "A* Algorithm Assignment",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 1,
    },
    {
      title: "Class work 3 submission",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 2,
    },
    {
      title: "Class work 2 submission",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 3,
    },
    {
      title: "Introduction to AI submission",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 4,
    },
    {
      title: "RE A* Algorithm Assignment",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 5,
    },
    {
      title: "RE Class work 3 submission",
      dueDate: "9:00pm 1/10/22",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 6,
    },
    {
      title: "RE Class work 2 submission",
      dueDate: "9:00pm 1/10/24",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 7,
    },
    {
      title: "RE Introduction to AI submission",
      dueDate: "9:00pm 1/10/24",
      setDate: "4.32pm 10/10/22",
      numOfReviewers: 0,
      numSubmissions: 12,
      open: false,
      id: 8,
    },
  ]);

  var i = 0;
  var stopcount = false;
  const [foundClicked, setFoundClicked] = useState(false);

  //function to update Peers per submission for a specific assignment, when a teacher changes its value
  function updatePPS(selectedId, pps) {
    //update peers per submission for a single field of the array searching for the corresponding changed input
    for (let i = 0; i < assignments.length; i++) {
      if (assignments[i].id === selectedId) {
        if (pps === "") {
          assignments[i].numOfReviewers = 0;
        } else {
          assignments[i].numOfReviewers = parseInt(pps);
          console.log(assignments);
        }
      }
    }
  }

  //function to change button UI depending on whether an assignment has been open or closed for peer reviewing
  function toggleButtonText(assignment) {
    if (assignment.open == true) {
      return true;
    } else {
      return false;
    }
  }

  //gets the location of the assignment in the use state array where the open peer assess button has been clicked and updates the open value
  function findClickedButton(view) {
    let newArr = [...assignments];
    newArr.forEach(findClickedFeedbackButton, view);
    //uses findClickedFeedbackButton to search for the index of the clicked button

    if (view.open == true) {
      newArr[i].open = false;
    } else {
      newArr[i].open = true;
    }
    //changes the value of the assignments to the new temporary assignments array after updating its open value to true or false
    setAssignments(newArr);
    i = 0;
    stopcount = false;
    console.log(assignments);
    console.log("new arr " + newArr[0].open);

  }

  //finds index of assignment where button was clicked
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

  function toggleButtonText(view) {
    if (view.open == true) {
      return true;
    } else {
      return false;
    }
  }

  //Middleware call in order to set assignments variable to the all assignments in a particular module
  useLayoutEffect(() => {
    const moduleId = props.moduleId;

    //Make a call to this for each id w/in module.assignments
    const getAssignmentDetails = async () => {
      const results = await Promise.all(
        props.mod.assignments.map(async (id) => {
          const response = await getAssignmentInfo(
            moduleId,
            id,
            ReactSession.get("token")
          );
          const data = await response.json();
          return data;
        })
      );
      //setAssignments(results);
      console.log("assigns " + assignments);
    };
    getAssignmentDetails();
  }, []);

  return (
    <>
      {/* Page title */}
      <div className=" ml-24 md:ml-80 md:mr-80 font-Dosis text-3xl font-bold py-2 dark:text-white">
        Closed Assignments
      </div>

       {/* Table for displaying all closed assignment information */}
      <div className="overflow-x-scroll xl:overflow-hidden w-2/3 sm:w-full  ml-16 sm:ml-0 ">
        <table className="  sm:table-fixed w-[1200px] text-sm text-left text-gray-500 dark:text-gray-400 sm:ml-80">
            {/* Table header contains Assignment title, set date, due date, number of submissions, peers per submission */}
          <thead className="text-s text-gray-700 font-Dosis  bg-slate-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-slate-900 ">
            <tr>
              <th className="px-6 py-3 border border-width-10">
                Assignment Title
              </th>
              <th className="px-6 py-3 border border-width-10">Set date</th>
              <th className="px-6 py-3 border border-width-10">Due date</th>
              <th className="px-6 py-3 border border-width-10">
                Number of Submissions
              </th>
              <th className="px-6 py-3 border border-width-10">
                Peers per Submission
              </th>
              <th className="px-6 py-3 border border-width-10"></th>
            </tr>
          </thead>
          {/* table body  */}
          <tbody>
            {assignments.map((assignment) =>
              assignment.open == false ? (  //displays row if the assignment due date has passed and teacher has not opened the assignment
                <tr className=" dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 bg-slate-100 border-2 border-slate-900">
                  <th
                    scope="row"
                    className=" px-6 py-4 font-medium text-gray-900 whitespace dark:text-white"
                  >
                    {assignment.title}
                  </th>
                  <td className="px-6 py-4">{assignment.setDate}</td>
                  <td className="px-6 py-4">{assignment.dueDate}</td>
                  <td className="px-6 py-4">{assignment.numSubmissions}</td>

                   {/* column for entering number of peers to peer assess */}
                  <td className="px-6 py-4">
                    <div className="">
                      Enter no. Peers (Limited to number of submissions{" "}
                      {assignment.numSubmissions}) :
                      <input
                        placeholder={assignment.numOfReviewers}
                        className=" border border-blue-400 text-center rounded-md ml-2 "
                        type="number"
                        min="0"
                        max={assignment.numSubmissions}
                        step="1"
                        onChange={(e) => {
                          if (e.target.value > assignment.numSubmissions - 1) {
                            updatePPS(
                              assignment.id,
                              assignment.numSubmissions - 1
                            );
                          } else if (e.target.value < 0) {
                            updatePPS(assignment.id, 0);
                          } else {
                            updatePPS(assignment.id, e.target.value);
                          }
                        }}
                      ></input>
                     
                    </div>
                  </td>
                  {/* Open /Close peer assess button column contains different stylings to inform users when the assignment is open (green field if open) */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => findClickedButton(assignment)}
                      className=" font-Dosis text-blue-100 text-l bg-blue-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800"
                    >
                      {toggleButtonText(assignment) === false ? (
                        <p>Open Peer Assess</p>
                      ) : (
                        <p>Close Peer Assess</p>
                      )}
                    </button>
                  </td>
                </tr>
              ) : assignment.open == true ? (
                <tr class=" dark:bg-gray-800 dark:border-gray-700 hover:bg-green-200 bg-green-100 border-2 border-slate-900">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {assignment.title}
                  </th>
                  <td className="px-6 py-4">{assignment.setDate}</td>
                  <td className="px-6 py-4">{assignment.dueDate}</td>
                  <td className="px-6 py-4">{assignment.numSubmissions}</td>

                  <td className="px-6 py-4">
                    <div className="">
                      Enter no. Peers (Limited to number of submissions{" "}
                      {assignment.numSubmissions}) :
                      <input
                        placeholder={assignment.numOfReviewers}
                        className=" border border-blue-400 text-center rounded-md ml-2 "
                        type="number"
                        min="0"
                        max={assignment.numSubmissions}
                        step="1"
                        onChange={(e) => {
                          if (e.target.value > assignment.numSubmissions - 1) {
                            updatePPS(
                              assignment.id,
                              assignment.numSubmissions - 1
                            );
                          } else if (e.target.value < 0) {
                            updatePPS(assignment.id, 0);
                          } else {
                            updatePPS(assignment.id, e.target.value);
                          }
                        }}
                      ></input>
                 
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => findClickedButton(assignment)}
                      className=" font-Dosis text-blue-100 text-l bg-red-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800"
                    >
                      {toggleButtonText(assignment) === false ? (
                        <p>Open Peer Assess</p>
                      ) : (
                        <p>Close Peer Assess</p>
                      )}
                    </button>
                  </td>
                </tr>
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

export default PeerManager;
