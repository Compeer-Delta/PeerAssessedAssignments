/**
 * Credit:
 * Functionality: Hathan Khatkar
 */
import React from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
function HeroSection({
  prevPageName,
  prevUrl,
  moduleTitle,
  moduleId,
  assignmentTitle,
  assignmentId,
  moduleCode,
}) {
  //passes in specific information to the herosection so it is able to redirect to the right page when back button is clicked
  return (
    <div
      id="hero"
      className="flex flex-co py-1 w-full bg-slate-800 dark:bg-zinc-800 text-gray-300"
    >
      
      <div className=" flex flex-row-2">
        {prevUrl.includes("/viewsubmissions") == true ? (
          <>
          {/* Back button to redirect to view submissions, separated to specify state information in link*/}
          <Link
            to={prevUrl}
            state={{
              modTitle: moduleTitle,
              nestedPage: "submitwork",
              modId: moduleId,
              modCode: moduleCode,
              assignmentTitle: assignmentTitle,
              assignmentId: assignmentId,
            }}
            className=" rounded-lg font-Dosis text-slate-900 bg-slate-400 text-center sm:w-[150px] w-[70px] sm:py-4 ml-1  text-m md:text-l font-semibold hover:bg-slate-300"
          >
            {" "}
            Back to {prevPageName}
          </Link>
          </>
        ) : prevUrl.includes("/upload/") == true ? (
          <>
          {/* Back button to redirect to upload work page  separated to specify state information in link*/}
          <Link
            to={prevUrl}
            state={{
              modId: moduleId,
              modTitle: moduleTitle,
              moduleCode: moduleCode,
            }}
            className=" rounded-lg font-Dosis text-slate-900 bg-slate-400 text-center sm:w-[150px] w-[70px] sm:py-4 ml-1  text-m md:text-l font-semibold hover:bg-slate-300"
          >
            {" "}
            Back to {prevPageName}
          </Link>
          </>
        ) : prevUrl.includes("/modules/") == true ? (
          <>
          {/* Back button to redirect to student view page separated to specify state information in link*/}
          <Link
            to={prevUrl}
            state={{
              moduleTitle: moduleTitle,
              nestedPage: "default",
              moduleCode: moduleCode,
            }}
            className=" rounded-lg font-Dosis text-slate-900 bg-slate-400 text-center sm:w-[150px] w-[70px] sm:py-4 ml-1  text-m md:text-l font-semibold hover:bg-slate-300"
          >
            {" "}
            Back to {prevPageName}
          </Link>
          </>
        ) : (
          <>
          {/* Back button to redirect to for all other pages that dont require specific state information*/}
          <Link
            to={prevUrl}
            className=" rounded-lg font-Dosis text-slate-900 dark:text-slate-100 dark:bg-zinc-700 bg-slate-400 text-center sm:w-[150px] w-[70px] sm:py-4 ml-1  text-m md:text-l font-semibold hover:bg-slate-300 dark:hover:bg-indigo-900"
          >
            {" "}
            Back to {prevPageName}
          </Link>
          </>
        )}

      </div>
      {/* Hero section title */}
      <h1 className="text-center mr-44 ml-20 sm:ml-0 w-full text-2xl  md:text-4xl mb-1 md:mb-4 font-semibold  text-gray-300 rounded-md">
        {" "}
        COMPEER
      </h1>
    </div>
  );
}

export default HeroSection;
