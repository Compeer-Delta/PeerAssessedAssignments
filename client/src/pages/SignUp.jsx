/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Jordan D'Souza
 */
import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import DropDownSearch from "../components/DropDownSearch";
import { register } from "../functions/api/userAPI";
import emailjs from "@emailjs/browser";
import sideImage from "/images/LoginSplashImage_COMPEER.png";
import BottomSection from "../components/BottomSection";
//imports

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [pwd, setPwd] = useState("");
  const [repwd, setRePwd] = useState("");
  //data from the login form

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  //variables for successfully getting passed validation

  const [verified, setVerified] = useState(false);
  const [inputcode, setInputCode] = useState();
  //verification code variables

  const [actualcode, setActualCode] = useState(() =>
    generateVerificationCode()
  );
  //a code is generated when the sign up page is rendered to be sent to email

  const [emailInputs, setEmailInputs] = useState({
    email: email,
    username: firstname,
    actualcode: actualcode,
  });
  //all information that will be sent to a verification email

  const [validationMessage, setValidationMessage] = useState("");

  //API call to register function will post user information to the database and therefore create a new admin account
  const createUser = async () => {
    //const { password, firstname, surname, email, institution, role } = req.body;
    console.log(
      pwd + " " + institution + " " + firstname + " " + lastname + " " + email
    ); 
    const response = await register(
      pwd,
      institution,
      firstname,
      lastname,
      email
    );
    const newUser = await response.json();
  };
  

  //function to check if the user inputs the correct verification code, if so continue to create admin account
  function checkVerification() { 
    console.log(inputcode, actualcode);
    if (inputcode == actualcode) {
      setVerified(true);
      createUser(); 
    }
  }

  //function to generate verification code (6 digit number)
  function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  useEffect(() => {
    setErrMsg("");
  }, [firstname, pwd]);

  //when the form is submitted this function is called for validation checks
  const handleSubmit = async (e) => {
    e.preventDefault();
    //checks all fields in form to see if they are ready to be verified if not display message to user
    if (institution == "" || institution == "Unlisted") {
      setValidationMessage("Please ensure you select an Institution");
    } else if (pwd != repwd) {
      setValidationMessage("Please ensure your password and re-password match");
    } else if (
      pwd.length < 10 ||
      !(/\d/.test(pwd) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pwd))
    ) {
      setValidationMessage(
        "Please make sure your password is at least 10 characters and contains atleast one numerical digit"
      );
    } else if (
      !/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email)
    ) {
      setValidationMessage("Please make sure you have entered a valid email");
    } else if (firstname == "" || lastname == "" || email == "") {
      setValidationMessage("Please make sure you filled all the details");
    } else {
      
      //if validation is passed then the verifcation email is sent using emailjs, sending email, firstname, actual code as parameters
      emailjs
        .send(
          "service_awsfb8e",
          "template_n35f2mi",
          { email, firstname, actualcode },
          "jBQKDXy824tIJnH8b"
        ) //form.current
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      //console.log(pwd, institution, firstname, lastname);
      //console.log(emailInputs);
      //Debug: displays form data in console

      setSuccess(true);
      //success is set to true so that the verification input box is rendered
    }
  };

  return (
    <>
      <BottomSection></BottomSection>

      <div className=" flex items-center flex-row text-sm font-medium 2xl:h-full dark:bg-zinc-900 bg-white">
        <div>
          <img
            src={sideImage}
            className=" mb-11 object-fill z-10 font-Dosis sidebar text-slate-200 dark:text-slate-100 lg:left-0 w-[0px] sm:w-[0px] 2xl:w-[1003px] xl:w-[0px] 2xl:h-full text-left bg-slate-900 dark:bg-indigo-900"
          />
          {/* bars icon */}
        </div>
        {/*Code for displaying left box, containing link to sign up page */}
        {/*success variable will determine whether the next page (admin/teacher/student view) will be displayed or if false, display the login page */}

        {success && !verified ? (
          <div className="h-screen 2xl:pr-80 font-Dosis dark:bg-zinc-900 bg-white w-full ">
            <div className="z-20 pl-10 ml-10 2xl:w-3/4 pb-10 dark:bg-zinc-900 bg-white 2xl:h-1/2 sm:h-full mb-64">
              <h1 className="py-20 text-4xl sm:text-4xl md:text-7xl  w-full text-slate-600 font-semibold dark:text-white rounded-md">
                Verify your COMPEER account
              </h1>
              {/*Title for account confirm*/}

              <div className="bg-indigo-100 md:ml-20 mr-20 px-5 mt-8 rounded text-center py-10 border-2 border-indigo-900">
                We've sent a verification email to: {email}
                <br></br>
                <br></br>
                <input
                  onChange={(e) => setInputCode(e.target.value)}
                  value={inputcode}
                  name="inputcode"
                  required
                  className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                  id="inputcode"
                  type="text"
                  placeholder="inputcode"
                ></input>
                {checkVerification()}
              </div>
            </div>
          </div>
        ) : verified ? (
          <>
            <div className="h-screen 2xl:pr-80 font-Dosis dark:bg-zinc-900 bg-white w-full ">
              <div className="z-20 pl-10 ml-10 2xl:w-3/4 pb-10 dark:bg-zinc-900 bg-white 2xl:h-1/2 sm:h-full mb-64">
                <h1 className="py-20 text-4xl sm:text-4xl md:text-7xl  w-full text-slate-600 font-semibold dark:text-white rounded-md">
                  Success!
                </h1>
                {/*Title for account confirm*/}
                <div className="bg-indigo-100 md:ml-20 mr-20 px-5 mt-8 rounded text-center py-10 border-2 border-indigo-900">
                  Your account has now been verified with the email {email}
                  <br></br>
                  <br></br>
                  <Link
                    to="/"
                    className=" rounded-lg font-Dosis text-slate-900 bg-slate-100 text-center w-[150px] py-3 px-2 ml-1  text-m md:text-l font-semibold hover:bg-slate-300"
                  >
                    {" "}
                    Try logging in!
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-screen 2xl:pr-80 font-Dosis dark:bg-zinc-900 bg-white w-full ">
              <div className="z-20 pl-10 ml-10 2xl:w-3/4 pb-10 dark:bg-zinc-900 bg-white 2xl:h-1/2 sm:h-full mb-64">
                <h1 className="py-20 text-4xl sm:text-7xl  w-full text-slate-600 font-semibold dark:text-white rounded-md">
                  {" "}
                  Register to COMPEER
                </h1>
                {/*Title and form display*/}

                <form className="w-full max-w-sm">
                  <div
                    id="validationMessage"
                    className="w-2/3 md:w-full md:ml-32 my-2 px-2 border bg-red-200 text-red-500 text-l"
                  >
                    {validationMessage}
                  </div>

                  <div className=" md:ml-32 dark:text-white">Institution</div>
                  {/*email*/}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:ml-32 w-2/3 md:w-full mb-10">
                      <DropDownSearch
                        setInstitution={setInstitution}
                      ></DropDownSearch>
                    </div>
                  </div>
                  <div className="mt-2"></div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>

                    <div className="md:w-2/3 dark:text-white">
                      {" "}
                      Email
                      <div className="flex flex-wrap z-50"></div>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        id="registerEmail"
                        value={email}
                        name="email"
                        required
                        className="w-2/3 md:w-full bg-slate-100 appearance-none border-2 border-slate-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="text"
                        placeholder="E-mail"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-6"></div>

                  {/*first Name*/}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3 dark:text-white">
                      {" "}
                      First Name
                      <div className="flex flex-wrap z-50"></div>
                      <input
                        ref={userRef}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="registerFirstName"
                        value={firstname}
                        name="username"
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-2/3 md:w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="text"
                        placeholder="First name"
                      ></input>
                    </div>
                  </div>
                  {/*last Name*/}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3 dark:text-white ">
                      {" "}
                      Last Name
                      <div className="flex flex-wrap z-50"></div>
                      <input
                        ref={userRef}
                        onChange={(e) => setLastName(e.target.value)}
                        id="registerLastName"
                        value={lastname}
                        name="username"
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-2/3 md:w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="text"
                        placeholder="Last name"
                      ></input>
                    </div>
                  </div>

                  {/*password input*/}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3 dark:text-white">
                      {" "}
                      Password (Must contain 10 characters and numbers)
                      <input
                        onChange={(e) => setPwd(e.target.value)}
                        id="registerPassword"
                        value={pwd}
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-2/3 md:w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="password"
                        placeholder="Password"
                      ></input>
                    </div>
                  </div>
                  {/*re password input*/}
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                      <input
                        onChange={(e) => setRePwd(e.target.value)}
                        id="registerRePassword"
                        value={repwd}
                        required
                        className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-2/3 md:w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                        type="password"
                        placeholder="Re-Password"
                      ></input>
                    </div>
                  </div>

                  {/*submit button */}
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                      <button
                        id="createAccount"
                        onClick={handleSubmit}
                        type="submit"
                        className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      >
                        Create Account
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
              </div>
            </div>
          </>
        )}
      </div>
      <div className="dark:bg-zinc-900 bg-white py-72 2xl:py-0"></div>
    </>
  );
}
export default SignUp;
