/**
 * Credit:
 * Functionality: Hathan Khatkar
 */
import React, { useState } from "react";
import StudentView from "../pages/StudentView";
import { Link, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ReactSession } from "react-client-session";
//imports

function ModuleItem({ title, modId }) {
  const [isStudentorTeacher, setIsStudentorTeacher] = useState(() =>
    checkIfStudentorTeacher()
  );
  const [modulename, setModulename] = useState(title);
  //function to check the account type, if it is an admin we return false, as we want to format modules slightly differently
  function checkIfStudentorTeacher() {
    if (
      ReactSession.get("accType") == "studentAccount" ||
      ReactSession.get("accType") == "teacherAccount"
    ) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      {/* Module item is an link, when clicked redirect to student view passing in the module information as a state*/}
      <Link
        to={"/modules/" + modId}
        state={{
          moduleTitle: modulename,
          nestedPage: "default",
          moduleCode: modId,
        }}
        rel="noreferrer"
        className="z-10 font-Dosis bg-slate-300 dark:bg-zinc-700 rounded-lg w-[340px] h-32 overflow-hidden hover:-translate-y-1 transform transition "
      >
        <div className="w-full h-5 object-cover bg-slate-600 dark:bg-indigo-900 rounded-lg rounded-b-none" />
        {/* Dispay module name and code */}
        <div className="text-gray-600 dark:text-gray-300 p-3 rounded-lg">
          <h3
            id={modulename}
            className="font-semibold text-center text-2xl mb-2 md:mb-1 rounded-lg"
          >
            {modulename}
          </h3>
          <h3
            id={modId}
            className="font-semibold text-center text-l text-blue-600 dark:text-indigo-200 rounded-lg"
          >
            {modId}
          </h3>

          {/* Display edit button if an admin*/}
          {!isStudentorTeacher ? (
            <Link
              to={"/createmodule"}
              className="inline-block ml-64 mt-1 px-5 text-slate-700 bg-slate-100 dark:bg-indigo-800 dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-300"
            >
              Edit
            </Link>
          ) : (
            <></>
          )}
        </div>
      </Link>
    </>
  );
}
export default ModuleItem;
