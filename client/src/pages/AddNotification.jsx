import React from "react";
import Modules from "../pages/Modules";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import { useState } from "react";
import StudentView from "./StudentView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubmitWork from "./SubmitWork";
import FileUploader from "../components/FileUploader";
import "../functions/api/notificationAPI";
import { ReactSession } from "react-client-session";

function AddNotification(props) {

  const [userId, setUserId] = useState(ReactSession.get("uid"));

  const [notifTitle, setNotifTitle] = useState("");
  const [notifContent, setNotifContent] = useState("");
  const [notifUrgency, setNotifUrgency] = useState(false);

  const addNewNotif = async (e) => {
    // Add a new notification
    const response = await addNotification(
      
    );
    const details = await response.json();
    console.log(details);
  };

  const toggleNewNotif = () => {

  }

  return (
    <>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <script src="../path/to/flowbite/dist/datepicker.js"></script>

      <div className="py-3 dark:bg-zinc-900 h-screen">
        <h1 className=" font-Dosis sm:ml-80 ml-32 text-3xl text-slate-600 font-semibold dark:text-white rounded-md pb-4"></h1>
        <div className=" font-Dosis  2xl:w-[1200px] w-screen text-xl border-2 border-slate-700 rounded  2xl:ml-80 2xl:mr-80 bg-slate-300 py-10">
          {confirmedAssignment === true ? (
            <>
              <p className="text-center bg-green-200">
                You have added a new notification
              </p>
              <button
                onClick={toggleNewNotif}
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
                placeholder="Write your notification content..."
              ></textarea>
            </div>
          )}
        </div>
        { /*Submit Button*/ }
        <div className="ml-8 md:flex md:items-center py-5">
            <div className="md:w-2/3 ">
              <button
                onClick={addNewNotif}
                className="ml-8 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
              >
              Add Notification
              </button>
            </div>
        </div>
      </div>
    </>
  );
}
export default AddNotification;
