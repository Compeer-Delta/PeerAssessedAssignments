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
import { addAssignment } from "../functions/api/assignmentAPI";
import { ReactSession } from "react-client-session";

function AddAssignment(props) {
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDesc, setAssignDesc] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [dueMins, setDueMins] = useState("");
  const [dueHour, setDueHour] = useState("");
  const [meridiem, setMeridiem] = useState("AM");

  const [confirmedAssignment, setConfirmedAssignment] = useState(false);
  const [userId, setUserId] = useState(ReactSession.get("uid"));

  const addNewAssignment = async (e) => {
    e.preventDefault();

    console.log(selectedDate);
    console.log("uid" + userId);
    console.log("mid" + props.moduleId);
    console.log("date " + Date.parse(formatTimeAndDate()) / 1000);
    console.log("startdate " + new Date().getTime() / 1000);

    const brief = undefined;
    const currentTimestamp = new Date().getTime() / 1000;
    const dueTimestamp = Date.parse(formatTimeAndDate()) / 1000;
    const reviewPeriod = 0;
    const numOfPeers = 1;
    const random = Math.floor(Math.random() * (4 - 1 + 1) + 1) == 1;
    const defaultImageURL =
      random === 1
        ? "https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-zoom-virtual-background-_Tcjok-d9b4.jpg"
        : random === 2
        ? "https://images.ctfassets.net/hrltx12pl8hq/5KiKmVEsCQPMNrbOE6w0Ot/341c573752bf35cb969e21fcd279d3f9/hero-img_copy.jpg?fit=fill&w=800&h=300"
        : random === 3
        ? "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"
        : "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80";

    const students = [];
    const teachers = [];
    const moduleId = props.moduleId;

    // Add a new assignment
    const response = await addAssignment(
      ReactSession.get("token"),
      userId,
      moduleId,
      assignTitle,
      assignDesc,
      brief,
      currentTimestamp,
      dueTimestamp,
      reviewPeriod,
      numOfPeers,
      defaultImageURL,
      teachers,
      students,
    );
    const details = await response.json();
    console.log(details);
    //Add to database here
    setConfirmedAssignment(true);
  };

  function formatTimeAndDate() {
    //formats the the time so it is able to be read by Date
    var tempHour = dueHour;
    var tempMin = dueMins;
    var tempMeridiem = meridiem;
    var tempDate = selectedDate + "";

    if (tempMeridiem === "PM") {
      tempHour = (parseInt(tempHour) + 12).toString();
    }
    if (parseInt(tempHour) < 10) {
      tempHour = "0" + tempHour;
    }
    // console.log(tempHour + " " + tempMin + " " + tempMeridiem);

    var month = tempDate.split(" ")[1];
    var monthVal = "1";

    switch (month) {
      case "Jan":
        monthVal = "01";
        break;
      case "Feb":
        monthVal = "02";
        break;
      case "Mar":
        monthVal = "03";
        break;
      case "Apr":
        monthVal = "04";
        break;
      case "May":
        monthVal = "05";
        break;
      case "Jun":
        monthVal = "06";
        break;
      case "Jul":
        monthVal = "07";
        break;
      case "Aug":
        monthVal = "08";
        break;
      case "Sep":
        monthVal = "09";
        break;
      case "Oct":
        monthVal = "10";
        break;
      case "Nov":
        monthVal = "11";
        break;
      case "Dec":
        monthVal = "12";
        break;
    }

    return (
      monthVal +
      "/" +
      tempDate.split(" ")[2] +
      "/" +
      tempDate.split(" ")[3] +
      " " +
      tempHour +
      ":" +
      tempMin +
      ":00"
    );
  }

  function switchMeridiem() {
    if (meridiem === "AM") {
      setMeridiem("PM");
    } else {
      setMeridiem("AM");
      if (dueHour === "12") {
        setDueHour(11);
      }
    }
  }

  function toggleNewAssignment() {
    setAssignTitle("");
    setAssignDesc("");
    setSelectedDate("");
    setDueMins("");
    setDueHour("");
    setMeridiem("AM");
    setNumPeerAssess("");
    setConfirmedAssignment(false);
  }

  return (
    <>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      <script src="../path/to/flowbite/dist/datepicker.js"></script>

      <div className="py-3 dark:bg-zinc-900 h-screen">
        <h1 className=" font-Dosis sm:ml-80 ml-32 text-3xl text-slate-600 font-semibold dark:text-white rounded-md pb-4">
          {" "}
          Add Assignment:
        </h1>
        <div className=" font-Dosis  2xl:w-[1200px] w-screen text-xl border-2 border-slate-700 rounded  2xl:ml-80 2xl:mr-80 bg-slate-300 py-10">
          {confirmedAssignment === true ? (
            <>
              <p className="text-center bg-green-200">
                You have set a new assignment {assignTitle}{" "}
              </p>
              <p className="text-center bg-green-200 ">
                {" "}
                You can view it in the Submit work tab
              </p>
              <button
                onClick={toggleNewAssignment}
                className="mt-10 ml-48 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
              >
                Add New Assignment
              </button>{" "}
            </>
          ) : (
            <div className="pl-10">
              <h1 className=" ml-8 text-l   text-slate-600 font-semibold dark:text-white rounded-md ">
                {" "}
                Title:{" "}
              </h1>

              <input
                onChange={(e) => setAssignTitle(e.target.value)}
                value={assignTitle}
                name="username"
                required
                className="ml-8  mb-10 bg-slate-100 appearance-none border-2 border-slate-200 rounded w-[260px] sm:w-[500px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                id="username"
                type="text"
                placeholder="Assignment Title"
              ></input>
              <h1 className=" ml-8  text-l  text-slate-600 font-semibold dark:text-white rounded-md ">
                {" "}
                Description:{" "}
              </h1>
              <textarea
                onChange={(e) => setAssignDesc(e.target.value)}
                value={assignDesc}
                name="username"
                required
                id="message"
                rows="4"
                className="ml-8  block p-2.5 w-[260px] sm:w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write an assignment description..."
              ></textarea>

              <h1 className="ml-8 mt-10 text-l text-slate-600 font-semibold dark:text-white rounded-md">
                {" "}
                Due Date and time:{" "}
              </h1>

              <div className="ml-8 flex flex-row mr-36  sm:w-[395px] w-[330px]">
                <DatePicker
                  className="rounded-md "
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
                <input
                  required
                  placeholder="0"
                  className=" text-center rounded-md"
                  type="number"
                  min="1"
                  max="12"
                  step="1"
                  value={dueHour}
                  onChange={(e) => {
                    if (e.target.value > 12) {
                      setDueHour(12);
                    } else if (e.target.value < 1) {
                      setDueHour(1);
                    } else {
                      setDueHour(e.target.value);
                    }
                    if (meridiem === "AM" && e.target.value === "12") {
                      setDueHour(11);
                    }
                  }}
                ></input>
                ::{" "}
                <input
                  placeholder="00"
                  required
                  className=" text-center rounded-md ml-2"
                  maxLength="2"
                  type="number"
                  min="00"
                  max="59"
                  step="1"
                  value={dueMins}
                  onChange={(e) => {
                    if (e.target.value > 59) {
                      setDueMins(59);
                    } else if (e.target.value < 0) {
                      setDueMins(0);
                    } else if (e.target.value < 10) {
                      setDueMins(("0" + e.target.value).slice(-2));
                    } else {
                      setDueMins(e.target.value.slice(-2));
                    }
                  }}
                ></input>
                <button
                  className="ml-3 text-center rounded hover:bg-slate-400 text-slate-700 bg-slate-100"
                  value={meridiem}
                  onClick={switchMeridiem}
                >
                  {" "}
                  {meridiem}{" "}
                </button>
              </div>
              <br></br>

              <h1 className="ml-8 mb-2 text-l w-[200px] text-slate-600 font-semibold dark:text-white rounded-md ">
                {" "}
                Upload Breif below:{" "}
              </h1>
              <div className="object-center">
                <FileUploader></FileUploader>
              </div>

              {/*submit button */}
              <div className="ml-8 md:flex md:items-center py-5">
                <div className="md:w-2/3 ">
                  <button
                    onClick={addNewAssignment}
                    className="ml-8 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
                  >
                    Add Assignment
                  </button>

                  {/*
              <button onClick={addNewAccounts} className="shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
              Confirm changes
              </button>
        */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default AddAssignment;
