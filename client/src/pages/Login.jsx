/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Gregory Clews, Jordan D'Souza
 * Bug fixing: Gregory Clews
 */
import React, { useLayoutEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import sideImage from "/images/LoginSplashImage_COMPEER.png";
import { login, accountPage } from "../functions/api/userAPI";
import BottomSection from "../components/BottomSection";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [accType, setAccType] = useState("studentAccount");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //data from the login form

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [failedVerifMessage, setFailedVerifMessage] = useState("");
  //variables to control login validation

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [accType, user, pwd]);
  //use effect for setting userRef referencing username input field

  useLayoutEffect(() => {
    ReactSession.setStoreType("sessionStorage");
  }, []);

  //when the form is submitted handleSubmit will run, preventDefault ensures the event is cancellable
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API call checks in DB whether the entered account information returns a valid account
    setFailedVerifMessage("");
    const response = await login(accType, user, pwd, ReactSession.get("token")); // validate login
    const userData = await response.json();
    const token = JSON.stringify(userData.token);

    //if the account is an admin, sets this variable to true
    if (accType == "adminAccount") {
      setIsAdmin(true);
    }

    //if a user token isn't returned for this session then the login details are incorrect
    if (!userData.token) {
      setFailedVerifMessage(
        "Your login details are incorrect, please make sure you have the correct username, password or account type again"
      );
    } else {
      //sets react session details
      ReactSession.set("token", token);
      ReactSession.set("accType", accType);
      ReactSession.set("email", user);
      
      //API call retrieves all account information for the user using the account type and token to identify it
      const response = await accountPage(
        accType,
        user,
        ReactSession.get("token")
      ); // get user details

      const details = await response.json();

      //sets account type session accordingly
      if (accType != "adminAccount") {
        ReactSession.set("accType", details.role + "Account");
      } else {
        ReactSession.set("accType", "adminAccount");
      }

      //admin and student/teacher databases contain different names for institution therefore adapt to each schema
      ReactSession.set("inst", details.institution);
      if (details.institution == undefined) {
        ReactSession.set("inst", details.institutionName);
      }

      ReactSession.set("uid", details.userId);
      setSuccess(true);
    }

    //clear form data
    setUser("");
    setPwd("");
  };

  return (
    <>
      {/*success variable will determine whether the next page (admin/teacher/student view) will be displayed or if false, display the login page */}
      {success && !isAdmin ? (
        <Routes>
          <Route path="/" element={<Navigate to="/modules" />} />
        </Routes>
      ) : 

      success && isAdmin ? (
        <Routes>
          <Route path="/" element={<Navigate to="/adminview" />} />
        </Routes>
      ) : (
        <>
          <BottomSection></BottomSection>

          <div className=" flex items-center flex-row text-sm font-medium 2xl:h-full dark:bg-zinc-900 bg-white">
            {/*Code for displaying left side image*/}
            <div>
              <img
                src={sideImage}
                className="mb-11 object-cover z-10 font-Dosis sidebar text-slate-200 dark:text-slate-100 lg:left-0 w-[0px] sm:w-[0px] 2xl:w-[1003px] xl:w-[0px] text-left bg-slate-900 dark:bg-indigo-900"
              />
           
            </div>
            <div className="h-screen 2xl:pr-80 font-Dosis dark:bg-zinc-900 bg-white w-full ">
              <div className="z-20 pl-10 ml-10 2xl:w-3/4 pb-10 dark:bg-zinc-900 bg-white 2xl:h-1/2 sm:h-full mb-64">
                <h1 className="py-20 text-4xl sm:text-7xl  w-full text-slate-600 font-semibold dark:text-white rounded-md">
                  {" "}
                  Login to COMPEER
                </h1>
                {/*Title and form display*/}

                <form onSubmit={handleSubmit} className="sm:w-full max-w-sm">
                  <div
                    id="loginError"
                    className=" w-2/3 sm:ml-32 my-2 px-2 border bg-red-200 text-red-500 text-l"
                  >
                    {failedVerifMessage}
                  </div>
                  <div className="sm:ml-36 text-l dark:text-white">
                    Login as...
                  </div>
                  <div
                    className="inline-flex sm:ml-32 pb-8 rounded-md "
                    role="group"
                  >
                    {/*Account type buttons (Student/Staff or Admin)*/}
                    <ul
                      onChange={(e) => setAccType(e.target.value)}
                      className="grid w-full grid-cols-2  "
                    >
                      <li>
                        <input
                          type="radio"
                          id="studentAccount"
                          name="account"
                          value="studentAccount"
                          className="hidden peer"
                          required
                          defaultChecked
                        />
                        <label
                          htmlFor="studentAccount"
                          className="rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100"
                        >
                          <div className="block">
                            <div
                              id="loginAsStudentStaff"
                              className="w-full text-b font-semibold"
                            >
                              Student/Staff
                            </div>
                          </div>
                        </label>
                      </li>

                      <li>
                        <input
                          type="radio"
                          id="adminAccount"
                          name="account"
                          value="adminAccount"
                          className="hidden peer"
                        />
                        <label
                          htmlFor="adminAccount"
                          className=" rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100"
                        >
                          <div className="block">
                            <div
                              id="loginAsAdmin"
                              className=" px-5 w-full text-b font-semibold"
                            >
                              Admin
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/*Username input*/}
                  <div className="flex items-center mb-2">
                    <div className=" sm:ml-32 md:flex md:items-center w-2/3">
                      <input
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        id="email"
                        type="text"
                        placeholder="Email"
                      ></input>
                    </div>
                  </div>

                  {/*password input*/}
                  <div className="flex md:items-center mb-6">
                    <div className=" sm:ml-32"></div>
                    <div className="w-2/3">
                      <input
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        id="password"
                        type="password"
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>

                  {/*forgotten password link*/}
                  <div className="sm:flex sm:items-center mb-6">
                    <div className="sm:w-1/3"></div>

                    <Link to="/" className="text-sm text-blue-500">
                      Forgot Password?
                    </Link>
                  </div>

                  {/*submit button */}
                  <div className="sm:flex md:items-center mb-32">
                    <div className="sm:w-1/3"></div>
                    <div className="sm:w-2/3">
                      <button
                        type="submit"
                        id="SignIn"
                        className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>

                <section>
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                </section>
                {/* Error Message ^ */}

                {/* Adding extra padding on bottom for horizontal phone users, so that the bottom section doesnt cover buttons */}
              </div>
            </div>
          </div>

          <div className="dark:bg-zinc-900 bg-white py-28 2xl:py-0"></div>
        </>
      )}
    </>
  );
}

export default Login;
