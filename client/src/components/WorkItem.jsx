import React from "react";
//import { MdTableChart } from 'react-icons/md'
import { Link } from "react-router-dom";
import { useState } from "react";
import defaultbg from "/images/DEFAULT_ASSIGNMENT_BG.jpg";

function WorkItem({
  id,
  imgUrl,
  title,
  tech,
  workUrl,
  dueDate,
  setDate,
  open,
  moduleId,
  moduleTitle,
  moduleCode,
  description,
}) {
  const [BriefUrl, setBriefUrl] = useState("/compeerSamplePDF.pdf");
  //DB: read the file where the passed id (or title) matches with the briefing (select from briefs where title/id = passed parameter in workitem [title/id])

  let current = new Date();
  const convertedSetDate = new Date(setDate);
  const convertedDueDate = new Date(dueDate);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // let time = formatTime();
  // let date = new Date(dueDate.split(/(\s+)/)[2] + " " + time);

  function formatTime() {
    //formats the the time so it is able to be read by Date
    var tempHour = dueDate.split(/(\s+)/)[0].split(":")[0];
    var tempMin = dueDate
      .split(/(\s+)/)[0]
      .split(":")[1]
      .substring(0, dueDate.split(/(\s+)/)[0].split(":")[1].length - 2);
    var tempMeridiem = dueDate
      .split(/(\s+)/)[0]
      .split(":")[1]
      .substring(
        dueDate.split(/(\s+)/)[0].split(":")[1].length - 2,
        dueDate.split(/(\s+)/)[0].split(":")[1].length
      );

    if (tempMeridiem === "pm") {
      tempHour = (parseInt(tempHour) + 12).toString();
    }
    if (parseInt(tempHour) < 10) {
      tempHour = "0" + tempHour;
    }
    // console.log(tempHour + " " + tempMin + " " + tempMeridiem);

    return tempHour + ":" + tempMin + ":00";
  }

  function LockAfterDue() {
    //checks whether the current time is less than due date/ time, if so then submission remains open / otherwise close submission
    let dateNow = current.getTime();
    let dateDue = new Date(dueDate); //date.getTime();

    //  console.log("t" + current);
    //   console.log("t" + date);

    if (dateNow < dateDue) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div
      href={workUrl}
      target="_blank"
      rel="noreferrer"
      className="bg-slate-300 dark:bg-zinc-700 rounded-lg overflow-hidden 2xl:w-full xl:w-[600px] md:w-[500px] w-[300px]"
    >
      <img
        src={imgUrl}
        className="w-full h-3 md:h-5 object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultbg;
        }}
      />

      <div className="text-gray-600 dark:text-gray-300 p-2 w-full">
        <h3
          id={title}
          className="text-lg md:text-xl mb-2 md:mb-1 font-semibold"
        >
          {title}
        </h3>
        <div className="text-sm md:text-sm mb-1 md:mb-1">
          Assignment Description: {description}
        </div>
        <p className=" text-right text-base">
          Set:{" "}
          {convertedSetDate.getHours() +
            ":" +
            (convertedSetDate.getMinutes() < 10
              ? "0" + convertedSetDate.getMinutes()
              : convertedSetDate.getMinutes()) +
            " " +
            convertedSetDate.getDay() +
            "/" +
            months[convertedSetDate.getMonth()] +
            "/" +
            convertedSetDate.getFullYear()}
        </p>

        <div className="flex flex-initial gap-2 flex-row items-center justify-start text-xs md:text-sm sticky z-0">
          {/* {//tech.map(item=> ( */}

          {LockAfterDue() === true ? (
            <Link
              to={"/modules/" + moduleCode + "/upload/" + id}
              state={{
                modId: moduleId,
                modTitle: moduleTitle,
                modCode: moduleCode,
              }}
              key="SubmitWork"
              className="inline-block px-2 py-3 text-yellow-800 font-bold bg-yellow-100 dark:bg-zinc-900 dark:text-yellow-400 hover:-translate-y-1 transform transition"
            >
              Submit Work 📂
            </Link>
          ) : (
            <div
              key="SubmitWork"
              className="inline-block px-2 py-3 text-red-100 font-bold bg-red-800 dark:text-red-400 dark:bg-zinc-900 hover:-translate-y-1 transform transition"
            >
              Submission Closed 🔒
            </div>
          )}

          {open === true && LockAfterDue() === false ? (
            <Link
              to={"/modules/" + moduleCode + "/viewsubmissions/" + id}
              state={{
                assignmentTitle: title,
                assignmentId: id,
                modId: moduleId,
                modTitle: moduleTitle,
                modCode: moduleCode,
              }}
              key="View Submissions"
              className="inline-block px-2 py-3 text-green-800 font-bold bg-green-100 dark:bg-zinc-900 dark:text-green-400 hover:-translate-y-1 transform transition"
            >
              Peer Assess 📝
            </Link>
          ) : (
            <div
              key="SubmitWork"
              className="inline-block px-2 py-3 text-red-100 font-bold bg-red-800 dark:bg-zinc-900 dark:text-red-400 hover:-translate-y-1 transform transition"
            >
              Peer Assess Locked 🔒
            </div>
          )}

          {/* )) }*/}
          <a
            href={BriefUrl}
            download
            className="inline-block px-2 py-3 text-blue-800 font-bold bg-blue-100 dark:bg-zinc-900 dark:text-blue-400 hover:-translate-y-1 transform transition"
          >
            Download Brief 📖
          </a>
          <span className="text-right text-gray-600 dark:text-gray-300 p-2 w-full text-base ">
            Due:{" "}
            {convertedSetDate.getHours() +
              ":" +
              (convertedDueDate.getMinutes() < 10
                ? "0" + convertedDueDate.getMinutes()
                : convertedDueDate.getMinutes()) +
              " " +
              convertedDueDate.getDay() +
              "/" +
              months[convertedDueDate.getMonth()] +
              "/" +
              convertedDueDate.getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
export default WorkItem;
