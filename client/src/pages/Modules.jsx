/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Jordan D'Souza
 */
import React from "react";
import ModuleItem from "../components/ModuleItem";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import LoginCard from "../components/LoginCard";
import { ReactSession } from "react-client-session";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import {
  getUserModules,
  getInstitutionModules,
} from "../functions/api/moduleAPI";
//imports

function Modules() {
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };
  //set session data

  //if admin account we display ALL modules for the institution
  //if staff/student we display only assigned modules
  const [isAdmin, setIsAdmin] = useState(() => checkIfAdmin());
  function checkIfAdmin() {
    if (session.accType == "adminAccount") {
      return true;
    } else {
      return false;
    }
  }

  const [modules, setModules] = useState([]);

  useLayoutEffect(() => {
    //API call to get all modules a user is enrolled to
    const fetchData = async () => {
      if (checkIfAdmin() === false) {
        const response = await getUserModules(
          session.email,
          ReactSession.get("token")
        );
        const data = await response.json();
        setModules(data);
      } else {
        //however if the user is an admin then we want all modules for a particular institution
        const response = await getInstitutionModules(
          session.inst,
          ReactSession.get("token")
        );
        const data = await response.json();
        setModules(data);
        //store this as modules
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/*if admin then we want to set the previous page in herosection to admin view otherwise the back button redirects to login*/}
      {isAdmin ? (
        <HeroSection
          prevPageName="Admin view"
          prevUrl="/adminview"
        ></HeroSection>
      ) : (
        <HeroSection prevPageName="login" prevUrl="/login"></HeroSection>
      )}

      <div className="fixed z-50">
        <LoginCard></LoginCard>
      </div>

      <div className="relative z-10 py-2 pb-80 dark:bg-zinc-900 h-full w-full">
        {/* Page title*/}
        <h1 className=" font-Dosis pl-12 md:pl-52 py-10 text-5xl w-[full] text-slate-600 font-semibold dark:text-white rounded-md ">
          {" "}
          Your Modules...
        </h1>
        <h1>{session.accountType}</h1>


        <div className=" pl-10 pr-10 2xl:w-[full] xl:w-[full] lg:w-[full] md:w-[full] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 ">
          {/* New Module creation button is displayed for admins only */}
          {isAdmin ? (
            <Link
              to="/CreateModule"
              id="createModule"
              rel="noreferrer"
              className="bg-slate-500 dark:bg-zinc-300 rounded-lg w-[340px] h-32 overflow-hidden hover:-translate-y-1 transform transition "
            >
              <div className="text-gray-100 dark:text-gray-800 p-3">
                <h3 className="text-lg md:text-2xl mb-2  md:mb-1 font-semibold text-center py-8  ">
                  + New Module
                </h3>
              </div>
            </Link>
          ) : (
            <></>
          )}
          {/* Maps all data from modules into as rendered ModuleItem formats*/}
          {modules && modules.length > 0 ? (
            <>
              {modules.map((module) => (
                <ModuleItem
                  key={module.moduleCode}
                  title={module.title}
                  modId={module.moduleCode}
                ></ModuleItem>
              ))}{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="2xl:pb-80 dark:bg-zinc-900"></div>
    </>
  );
}

export default Modules;
