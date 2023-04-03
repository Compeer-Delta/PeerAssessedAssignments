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

  const addNewNotif = async (e) => {
    // Add a new notification
    const response = await addNotification(

    );
    const details = await response.json();
    console.log(details);
  };


  return (
    <>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <script src="../path/to/flowbite/dist/datepicker.js"></script>

      <div className="py-3 dark:bg-zinc-900 h-screen">
        <h1 className=" font-Dosis sm:ml-80 ml-32 text-3xl text-slate-600 font-semibold dark:text-white rounded-md pb-4"></h1>
        <div className=" font-Dosis  2xl:w-[1200px] w-screen text-xl border-2 border-slate-700 rounded  2xl:ml-80 2xl:mr-80 bg-slate-300 py-10">
          
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
