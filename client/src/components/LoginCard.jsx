/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API fetch: Gregory Clews
 */
import React, { useState, useLayoutEffect } from "react";
import { Link, Navigate, Routes, Route } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { getUserName } from "../functions/api/userAPI";
//imports

function LoginCard() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [sessionUsername, setSessionUsername] = useState("");
  const [minimized, setMinimized] = useState(false);
  //information displayed in login card

  //when the logout button is clicked, all react session data is removed before redirecting to login page
  function logout() {
    setLoggedOut(true);
    setSessionUsername("");

    ReactSession.remove("email");
    ReactSession.remove("accType");
    ReactSession.remove("token");
    ReactSession.remove("inst");
    ReactSession.remove("uid");

    console.log("LOGOUT SUCCESS");
  }

  //toggles the minimize feature when clicked
  function toggleMinimize() {
    if (minimized == true) {
      setMinimized(false);
    } else {
      setMinimized(true);
    }
  }

  useLayoutEffect(() => {
    //API fetch for retreiving the users name by specifiying account specific information (email, token, account type)
    const getFirstName = async () => {
      const response = await getUserName(
        ReactSession.get("email"),
        ReactSession.get("token"),
        ReactSession.get("accType")
      );
      const userData = await response.json();
      setSessionUsername(userData.firstname);
    };

    getFirstName();
  }, []);

  return (
    <div className="fixed z-30">
      {/* Login tab */}
      {minimized === false ? (
        <h1 className="dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800">
          {" "}
          Logged in as {sessionUsername}
          <button
            onClick={toggleMinimize}
            className="font-Dosis text-sm absolute top-0 right-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition"
          >
            <p> Minimize </p>
          </button>
          <button
            onClick={logout}
            id="logoutButton"
            className="ml-14 p-0.5 mt-3 flex items-center  text-center px-12 cursor-pointer rounded-2xl text-slate-100 dark:text-gray-300 bg-red-600  hover:bg-red-300 transform transition"
          >
            <p> Logout</p>
          </button>
        </h1>
      ) : (
        <button
          onClick={toggleMinimize}
          className="dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 pb-6 h-[100px] w-[60px] text-sm text-left pl-1 text-gray-100 dark:text-gray-300 bg-slate-600 dark:bg-zinc-800"
        >
          {" "}
          View Login Info
        </button>
      )}
      <Routes>
        <Route path="/" element={loggedOut ? <Navigate to="/" /> : <></>} />
      </Routes>
    </div>
  );
}
export default LoginCard;
