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

function Modules() {
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };

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
    //console.log("===== useEffect TRIGGERED =====");
    
    //console.log(fr);
    const fetchData = async () => {
      if (checkIfAdmin() === false) {
        const response = await getUserModules(session.email, ReactSession.get("token"));
        const data = await response.json();
        setModules(data);      
      } else {
        const response = await getInstitutionModules(session.inst, ReactSession.get("token"));
        const data = await response.json();
        setModules(data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
        <h1 className=" font-Dosis pl-12 md:pl-52 py-10 text-5xl w-[full] text-slate-600 font-semibold dark:text-white rounded-md ">
          {" "}
          Your Modules...
        </h1>
        <h1>{session.accountType}</h1>

        <div className=" pl-10 pr-10 2xl:w-[full] xl:w-[full] lg:w-[full] md:w-[full] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 ">
          {isAdmin ? (
            <Link
              to="/CreateModule"
              id="createModule"
              rel="noreferrer"
              className="bg-slate-500 dark:bg-zinc-300 rounded-lg w-full h-20 overflow-hidden hover:-translate-y-1 transform transition "
            >
              <div className="text-gray-100 dark:text-gray-800 p-3">
                <h3 className="text-lg md:text-xl mb-2 md:mb-1 font-semibold text-center py-3 ">
                  + New Module
                </h3>
              </div>
            </Link>
          ) : (
            <></>
          )}

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
