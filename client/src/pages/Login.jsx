import React from 'react'
import { Link , Navigate, Route, Routes} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useRef, useState, useEffect} from 'react';
import {ReactSession} from 'react-client-session'
import StudentView from '../pages/StudentView';
import SignUp from '../pages/SignUp';
import Modules from './Modules';
import DropDownSearch from '../components/DropDownSearch';
import AdminView from './AdminView';
import sideImage from '/images/LoginSplashImage_COMPEER.png'


function Login() {

  const userRef = useRef();
  const errRef = useRef();

  // const TEST_TEACHER_ACCOUNT = {username: "test_teacher", password:"test123"}
  // const TEST_STUDENT_ACCOUNT = {username: "test_student", password:"test123"}
  // const TEST_ADMIN_ACCOUNT = {username: "test_admin", password:"test123"}

  const [institution, setInstitution] = useState('');
  const [accType, setAccType] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  //data from the login form

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); //temporary: always sets account login as success, however needs to be altered to check DB first
  const [isAdmin, setIsAdmin] = useState(false);

  const [failedVerifMessage, setFailedVerifMessage] = useState("");

  useEffect(() => {userRef.current.focus();}, [])
  useEffect(() => {setErrMsg('');}, [accType,user,pwd])

  ReactSession.setStoreType("sessionStorage");

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(accType, user, pwd);

    //Debug: displays form data in console
    setFailedVerifMessage("");

    // !-- JD750 - Fetching from MongoDB --!
    const fr = accType === 'adminAccount' ? 'http://localhost:8081/admin/login' : 'http://localhost:8081/login';

    const response = await fetch(fr, {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": user,
        "password": pwd,
      })
    });

    const userData = await response.json();

    //console.log(JSON.stringify(userData.token));
    const token = JSON.stringify(userData.token);

    if(accType == "adminAccount") {
      setIsAdmin(true);
    }

    if(!userData) {

      setFailedVerifMessage("Your login details are incorrect, please make sure you have the correct username, password, institution or account type again");
    
    } else {
      setSuccess(true);
      //sessionStorage.setItem("loginSessionData", {token, accType, email});
      ReactSession.set("token", token);
      ReactSession.set("accType", accType);
      ReactSession.set("email", user);

      //Debug: displays session data in console
      console.log(ReactSession.get("token"));

    }

    //clear form data
    setUser('');
    setPwd('');
  }

  return (
    <>
   
        {/*success variable will determine whether the next page (admin/teacher/student view) will be displayed or if false, display the login page */}
        {success && !isAdmin ? (
          <Routes>
          <Route path="/" element={<Navigate to="/modules" />}/>
          </Routes>
           //  <StudentView/>
             
        ): success && isAdmin ? (
          <Routes>
          <Route path="/" element={<Navigate to="/adminview" />}/>
          </Routes>)
        
        :(  
        <>
          <img src={sideImage} className ="font-Dosis sidebar text-slate-200 dark:text-slate-100 fixed lg:left-0 w-[600px] h-[900px] overflow-y-auto text-left bg-slate-900 dark:bg-indigo-900"/>{/* bars icon */}
   
  
         {/*Code for displaying left box, containing link to sign up page */}
        
      
      <div className= 'font-Dosis dark:bg-zinc-900'>
        <div className='max-w-xl mx-auto w-full h-[900px]'>
          <h1 className= 'py-16 text-7xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md'> Login to COMPEER</h1> 
           {/*Title and form display*/}
  
           
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className=" w-full ml-32 my-2 px-2 border bg-red-200 text-red-500 text-l">{failedVerifMessage}</div>
          <div className="ml-36 text-l dark:text-white">Login as...</div>
            <div className="inline-flex pl-32 pb-8 rounded-md" role="group">
       
              {/*Account type buttons (Student or staff)*/}
              <ul onChange = {(e) => setAccType(e.target.value)} className="grid w-full md:grid-cols-2  ">
                <li>
                  <input type="radio" id="studentAccount" name="account" value="studentAccount" className="hidden peer" required />
                  <label for="studentAccount" className="rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100">                           
                  <div className="block">
                    <div className="w-full text-b font-semibold">Student/Staff</div>              
                  </div>
                </label>
                </li>         
            
                <li>
                <input type="radio" id="adminAccount" name="account" value="adminAccount" className="hidden peer" />
                <label for="adminAccount" className=" rounded-full inline-flex justify-between items-center p-5 w-full h-5 text-gray-500 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-100">
                  <div className="block">
                  <div className=" px-5 w-full text-b font-semibold">Admin</div>
                  </div>  
                </label>
                </li>
              </ul>
        
            </div>
            <div className = "ml-32">
            <DropDownSearch setInstitution ={setInstitution}></DropDownSearch>
    
            </div>
            {/*Username input*/}
            <div className="md:flex md:items-center mb-2">

    
              
              <div className="ml-32 md:flex md:items-center md:w-2/3">
            

            <input
              ref={userRef} 
              onChange = {(e) => setUser(e.target.value)}
             value={user}
              required 
            className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="username" type="text" placeholder="Email">
            </input>

            </div>
          </div>

          {/*password input*/}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">    
            </div>
          <div className="md:w-2/3">
            <input 
              onChange = {(e) => setPwd(e.target.value)}
              value={pwd}
              required 
              className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="password" type="password" placeholder="Password"> 
            </input>
          </div>
          </div>

          {/*forgotten password link*/}
          <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>

          <Link to="/" className="text-sm text-blue-500">
           Forgot Password?
          </Link>
          </div>

        {/*submit button */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button type="submit" className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Sign In
                </button>
              </div>   
            </div>
          </form>

    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    </section>
    {/* Error Message ^ */}

  </div>
</div>

{/*bottom section menu*/}
<div className= 'py-5 h-[69px] bg-slate-800 dark:bg-zinc-800 text-gray-300'>
        
         <Link to="/" className = 'pr-64 pl-64 first-line:inset-y-0 left-0'>Home</Link>
         <span className = 'pr-64 pl-64 inset-y-0 right-0'>Terms of Service</span>
         <span className = 'pr-64 pl-64 inset-y-0 right-0'>Privacy Policy</span>
         <p className='text-xs mt-2 text-white '>© COMPEER {new Date().getFullYear()}. All rights reserved
        
        </p>
           </div>
</>
)}
</>
  ) 
}

export default Login