import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { sidebardata } from "../data/sidebardata";
import ViewFeedback from "../pages/ViewFeedback";
import { ReactSession } from "react-client-session";
import { getTeachers } from "../functions/api/moduleAPI";

function SideBar({ moduleTitle, moduleId, moduleCode }) {
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };

  const [sidebar, setSidebar] = useState(false);
  const [minimizedTL, setMinimizedTL] = useState(false);
  const [minimizedMT, setMinimizedMT] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [moduleTeachers, setModuleTeachers] = useState();

  function toggleMinimizeMT() {
    //toggle minimize for module tab
    if (minimizedMT == true) {
      setMinimizedMT(false);
    } else {
      setMinimizedMT(true);
    }
  }
  function toggleMinimizeTL() {
    //toggle minimize for teacher list
    if (minimizedTL == true) {
      setMinimizedTL(false);
    } else {
      setMinimizedTL(true);
    }
  }

  // Get all teachers for module (useEffect is used to only run once)
  useEffect(() => {
    //16485c21-93c5-4016-8094-4a0de6bb394c
    const getTeachersList = async () => {
      const response = await getTeachers(moduleId, sessionStorage.getItem("token"));
      const data = await response.json();
      setModuleTeachers(data);
    };

    getTeachersList();
  }, [moduleId]);

  return (
    <div className="fixed z-30">
      {/* module tab */}
      {minimizedMT === false ? (
        <h1 className="dark:border-indigo-900 rounded-br-lg rounded-tr-lg border-solid border-l-0 border-2 border-zinc-600 font-semibold sidebar fixed lg:left-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800">
          {" "}
          <div id="moduleTabTitle">{moduleTitle} Tabs</div>
          <button
            onClick={toggleMinimizeMT}
            className="text-sm absolute top-0 right-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition"
          >
            <p> Minimize </p>
          </button>
          {sidebardata.map((item, index) => {
            return item.path === "viewfeedback" &&
              session.accType === "teacherAccount" ? (
              <></> //outputData.accountType //change ! teacheraccount  for debugging viewfeedback
            ) : (
              <Link
                key={index}
                to={"/modules/" + moduleCode}
                id={"tab_" + item.path}
                state={{ moduleTitle: moduleTitle, nestedPage: item.path }}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-slate-900 dark:text-gray-300 bg-slate-100 dark:bg-zinc-900 hover:-translate-y-2 transform transition "
              >
                <li className={item.cName}>
                  {item.icon}
                  <span>{item.title}</span>
                </li>
              </Link>
            );
          })}
        </h1>
      ) : (
        <button
          onClick={toggleMinimizeMT}
          className="dark:border-indigo-900 rounded-br-lg rounded-tr-lg border-solid border-l-0 border-2 border-zinc-600 font-semibold sidebar fixed lg:left-0 p-1 w-[60px] h-[240px] text-left text-gray-100 dark:text-gray-300 bg-slate-700 dark:bg-zinc-800"
        >
          {" "}
          View Module Tab{" "}
        </button>
      )}

      {/* Teachers tab */}

      {minimizedTL === false ? (
        <h1 className="dark:border-indigo-900 mt-32 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800">
          {" "}
          Module Teachers
          <button
            onClick={toggleMinimizeTL}
            className="text-sm absolute top-0 right-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition"
          >
            <p> Minimize </p>
          </button>
          {moduleTeachers && moduleTeachers.length > 0 ? (
            <>
              {moduleTeachers.map((teachers) => {
                return (
                  <div className="p-1 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-slate-900 dark:text-gray-300 bg-slate-200 dark:bg-zinc-900 hover:-translate-y-2 transform transition">
                    <div key={teachers.email}>
                      <p>
                        <span>
                          {teachers.firstname} {teachers.surname}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </h1>
      ) : (
        <button
          onClick={toggleMinimizeTL}
          className="dark:border-indigo-900 mt-32 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 p-1 w-[60px] h-[120px] text-left text-gray-100 dark:text-gray-300 bg-slate-700 dark:bg-zinc-800"
        >
          {" "}
          View Teacher List{" "}
        </button>
      )}
    </div>
  );
}

export default SideBar;
