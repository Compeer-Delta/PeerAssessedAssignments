import React, { useLayoutEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import StudentView from "../pages/StudentView";
import SignUp from "../pages/SignUp";
import Modules from "./Modules";
import DropDownSearch from "../components/DropDownSearch";
import AdminView from "./AdminView";
import sideImage from "/images/LoginSplashImage_COMPEER.png";

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  // const TEST_TEACHER_ACCOUNT = {username: "test_teacher", password:"test123"}
  // const TEST_STUDENT_ACCOUNT = {username: "test_student", password:"test123"}
  // const TEST_ADMIN_ACCOUNT = {username: "test_admin", password:"test123"}

  //const [institution, setInstitution] = useState('');
  const [accType, setAccType] = useState("studentAccount");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  //data from the login form

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //temporary: always sets account login as success, however needs to be altered to check DB first
  const [isAdmin, setIsAdmin] = useState(false);

  const [failedVerifMessage, setFailedVerifMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [accType, user, pwd]);

  useLayoutEffect(() => {
    ReactSession.setStoreType("sessionStorage");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Debug: displays form data in console
    setFailedVerifMessage("");

    // !-- JD750 - Fetching from MongoDB --!
    const fr =
      accType === "adminAccount"
        ? "http://localhost:8081/admin/login"
        : "http://localhost:8081/login";

    const response = await fetch(fr, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: ReactSession.get("token"),
      },
      body: JSON.stringify({
        email: user,
        password: pwd,
      }),
    });

    const userData = await response.json();
    console.log(userData);
    const token = JSON.stringify(userData.token);

    if (accType == "adminAccount") {
      setIsAdmin(true);
    }

    if (!userData.token) {
      setFailedVerifMessage(
        "Your login details are incorrect, please make sure you have the correct username, password or account type again"
      );
    } else {
      setSuccess(true);
      //sessionStorage.setItem("loginSessionData", {token, accType, email});
      ReactSession.set("token", token);
      ReactSession.set("accType", accType);
      ReactSession.set("email", user);


      //New Route to get all details necessary (can be expanded on)
      const fr2 =
        accType === "adminAccount"
          ? "http://localhost:8081/admin/me?email=" + user
          : "http://localhost:8081/user/me?email=" + user;

      const response = await fetch(fr2, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: ReactSession.get("token"),
        },
      });

      //Await JSON response and set session var(s)
      const details = await response.json();
      ReactSession.set("inst", details.institutionName);
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
      ) : //  <StudentView/>

      success && isAdmin ? (
        <Routes>
          <Route path="/" element={<Navigate to="/adminview" />} />
        </Routes>
      ) : (
        <>
          <nav className="z-20 fixed bottom-0 bg-slate-800 dark:bg-zinc-700 w-full">
            <div className=" px-4 py-3 mx-auto md:px-6">
              <div className="flex items-center">
                <ul className="flex flex-row mt-0 space-x-20 md:space-x-32 2xl:space-x-80 text-sm font-medium py-5 w-full">
                  <li>
                    <Link
                      to="/"
                      className=" 2xl:ml-32 sm:mx-3  text-white hover:underline"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="2xl:ml-64 xl:mx-16 sm:mx-3 text-white hover:underline truncate"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="2xl:ml-64 xl:mx-16 sm:mx-3 text-white hover:underline truncate"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className=" flex items-center flex-row text-sm font-medium 2xl:h-full dark:bg-zinc-900 bg-white">
            {/*Code for displaying left box, containing link to sign up page */}
            <div>
              <img
                src={sideImage}
                className="mb-11 object-cover z-10 font-Dosis sidebar text-slate-200 dark:text-slate-100 lg:left-0 w-[0px] sm:w-[0px] 2xl:w-[1003px] xl:w-[0px] text-left bg-slate-900 dark:bg-indigo-900"
              />
              {/* bars icon */}
            </div>

            <div className="h-screen 2xl:pr-80 font-Dosis dark:bg-zinc-900 bg-white w-full ">
              <div className="z-20 pl-10 ml-10 2xl:w-3/4 pb-10 dark:bg-zinc-900 bg-white 2xl:h-1/2 sm:h-full mb-64">
                <h1 className="py-20 text-4xl sm:text-7xl  w-full text-slate-600 font-semibold dark:text-white rounded-md">
                  {" "}
                  Login to COMPEER
                </h1>
                {/*Title and form display*/}

                <form onSubmit={handleSubmit} className="sm:w-full max-w-sm">
                  <div className=" w-2/3 sm:ml-32 my-2 px-2 border bg-red-200 text-red-500 text-l">
                    {failedVerifMessage}
                  </div>
                  <div className="sm:ml-36 text-l dark:text-white">
                    Login as...
                  </div>
                  <div
                    className="inline-flex sm:ml-32 pb-8 rounded-md "
                    role="group"
                  >
                    {/*Account type buttons (Student or staff)*/}
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
                          for="studentAccount"
                          className="rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100"
                        >
                          <div className="block">
                            <div className="w-full text-b font-semibold">
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
                          for="adminAccount"
                          className=" rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100"
                        >
                          <div className="block">
                            <div className=" px-5 w-full text-b font-semibold">
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
                        id="username"
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
