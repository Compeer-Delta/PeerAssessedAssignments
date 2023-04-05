/**
 * Credit:
 * Functionality: Jordan D'Souza
 */
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from "../functions/api/notificationAPI";
import { getUserId } from "../functions/api/userAPI";
import { ReactSession } from "react-client-session";
import ModuleSearchBox from "../components/ModuleSearchBox";
import { useParams } from "react-router-dom";
import formatUnixTimestamp from "../functions/tools/formatUnixTimestamp";
import { getAssignmentInfo } from '../functions/api/assignmentAPI';

function AddNotification(mod) {

  const [userId, setUserId] = useState(ReactSession.get("uid"));
  const [userInst, setUserInst] = useState(ReactSession.get("inst"));
  const [userEmail, setUserEmail] = useState(ReactSession.get("email"));
  
  const [notifTitle, setNotifTitle] = useState("");
  const [notifContent, setNotifContent] = useState("");
  const [notifUrgency, setNotifUrgency] = useState(false); //Not urgent by default
  const [referredAssign, setReferredAssignment] = useState(null);
  const [module, setModule] = useState(mod.mod);
  const [assignments, setAssignments] = useState([]);
  const [allUserIDs, setAllUserID] = useState([]);

  const params = useParams();

  const [confirmedNotification, setConfirmedNotification] = useState(false);

  const addNewNotif = async (e) => {
    // console.log(
    //   allUserIDs, //shown as userId in the schema, is an array of recipients' userId in reality 
    //   notifTitle,
    //   notifContent,
    //   notifUrgency,
    //   referredAssign,
    // );

    // Add a new notification
    const response = await createNotification(
      allUserIDs, //shown as userId in the schema, is an array of recipients' userId in reality 
      notifTitle,
      notifContent,
      notifUrgency,
      referredAssign,
      module.moduleId,
      ReactSession.get("token")
    );
    const details = await response.json();
    console.log(details);

    setConfirmedNotification(true);
  };

  // Clears input fields and allows the user to add another notification
  const toggleNewNotif = () => {
    setNotifContent("");
    setNotifTitle("");
    setNotifUrgency(false);
    setConfirmedNotification(false);
  }

  useLayoutEffect(() => {
    const moduleId = mod.moduleId;
    
    // Gets all the assignment details
    const getAssignmentDetails = async () => {
      const results = await Promise.all(
          module.assignments.map(async (id) => {
              const response = await getAssignmentInfo(moduleId, id, ReactSession.get("token"));

              const data = await response.json();
              return data;
          })
      );
      setAssignments(results);
    }

    // Gets all IDs of both students and teachers enrolled in this module
    const getAllId = async () => {
      const users = [...module.students, ...module.teachers];

      const results = await Promise.all(
          users.map(async (email) => {
              const response = await getUserId(email, ReactSession.get("token"));

              const data = await response.json();
              return data;
          })
      );

      // Flattens the data, and maps it so it leaves an array of UserIDs (and not an array of JSON objects)
      const data = results.flat();
      const ids = data.map((user) => user.userId);

      setAllUserID(ids);
    }
    
    getAssignmentDetails();
    getAllId();
  }, [])

  return (
    <>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <script src="../path/to/flowbite/dist/datepicker.js"></script>

      <div className="py-3 dark:bg-zinc-900 h-screen pl-10">
      <h1 className=" font-Dosis sm:ml-80 ml-32 text-3xl text-slate-600 font-semibold dark:text-white rounded-md pb-4">
          {" "}
          Add Notification:
        </h1>
        <div className=" font-Dosis  2xl:w-[1200px] w-screen text-xl border-2 border-slate-700 rounded  2xl:ml-80 2xl:mr-80 bg-slate-300 py-10">
          {confirmedNotification === true ? (
            <>
              <p className="text-center bg-green-200">
                You have added a new notification
              </p>
              <button
                onClick={(e) => toggleNewNotif()}
                className="mt-10 ml-48 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
              >
                Add New Notification
              </button>{" "}
            </>
          ) : (
            <div className="pl-10">
              <h1 className=" ml-8 text-l   text-slate-600 font-semibold dark:text-white rounded-md ">
                {" "}
                Subject:{" "}
              </h1>
              <input
                onChange={(e) => setNotifTitle(e.target.value)}
                value={notifTitle}
                name="notifT"
                required
                className="ml-8  mb-10 bg-slate-100 appearance-none border-2 border-slate-200 rounded w-[260px] sm:w-[500px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                id="notifT"
                type="text"
                placeholder="Notification Subject"
              ></input>

              <h1 className=" ml-8  text-l  text-slate-600 font-semibold dark:text-white rounded-md ">
                {" "}
                Description:{" "}
              </h1>
              <textarea
                onChange={(e) => setNotifContent(e.target.value)}
                value={notifContent}
                name="notifC"
                required
                id="notifC"
                rows="4"
                className="ml-8  block p-2.5 w-[260px] sm:w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write something to tell your students..."
              ></textarea>

              <h1 className=" ml-8  text-l  text-slate-6 00 font-semibold dark:text-white rounded-md ">
                {" "}
                Referenced Assignment:{" "}
              </h1>
              {assignments && assignments.length > 0 ? (
              <>
              <select onChange={(e) => setReferredAssignment(e.target.value)} name="modSelect" className="ml-8 block p-2.5 w-[260px] sm:w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected value="" name="none">None</option>
                {assignments.map((a) => (
                  <option 
                  value={a.assignmentId}
                  name={a.title}
                  >
                    {a.title + " | Due: " + formatUnixTimestamp(a.endDate)}
                  </option>
                ))} 
              </select>
              </>
              )  : (
              <></>
              )}

              <h1 className=" ml-8  text-l  text-slate-6 00 font-semibold dark:text-white rounded-md ">
                {" "}
                Urgent?{" "}
              </h1>
              <label className= "block text-sm">
              <input
                type = "checkbox"
                className = "ml-8"
                name = "notifU"
                id = "notifU"
                value = {notifUrgency}
                onChange = {(e) => setNotifUrgency(!notifUrgency)}
              ></input>
              Tick if the notification is urgent.
              </label>

              { /*Submit Button*/ }
              <div className="ml-8 md:flex md:items-center py-5">
                <div className="md:w-2/3 ">
                <button
                  onClick={(e) => addNewNotif()}
                  className="ml-8 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
                >
                Add Notification
                </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default AddNotification;
