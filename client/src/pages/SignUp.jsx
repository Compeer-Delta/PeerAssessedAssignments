import React from 'react'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useRef, useState, useEffect} from 'react';
import StudentView from '../pages/StudentView';
import DropDownSearch from '../components/DropDownSearch';
//const mongoose = require("mongoose");
import mongoose from 'mongoose';
//const Admin = require(`../schemas/admin`);
//import Admin from '../schemas/admin';
import Login from './Login';

import emailjs from '@emailjs/browser';

function SignUp() {
  
    //const emailRef = useRef();
    const userRef = useRef();
    const errRef = useRef();
  
    const [institution, setInstitution] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [repwd, setRePwd] = useState('');
    //data from the login form
  
    const [errMsg, setErrMsg] = useState('');       
    const [success, setSuccess] = useState(false); //temporary: always sets account login as success, however needs to be altered to check DB first

    const [verified, setVerified] = useState(false);
    const [inputcode, setInputCode] = useState();
    
    const [actualcode, setActualCode] = useState(()=> generateVerificationCode());

    const [emailInputs, setEmailInputs] = useState({email: email, username: user, actualcode: actualcode });

    const [validationMessage, setValidationMessage] = useState("");

    const createUser = async () => {

      //const { password, firstname, surname, email, institution, role } = req.body;

      const response = await fetch("http://localhost:8081/admin", {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "password": pwd,
          "firstname": firstname,
          "surname": lastname,
          "email": email,
          "institution": institution,
          "role": "admin" 
        })
      });

      const newUser = await response.json();

    }

    function checkVerification() //change to async when connecting to db -> async function checkVerification
    {
      console.log(inputcode, actualcode);
      if (inputcode == actualcode)
      {
         //lookup admin
        // let storedAdmin = await Admin.findOne({ userId: user });
         //create new entry if no admin account found
         //if (!storedUser) {
           //create admin entry in DB
          // storedUser = await new Inventory({
         //    _id: mongoose.Types.ObjectId(),
         //    userId: user,
         //    details: {
         //      firstname: firstname,
         //      surname: lastname,
         //      email: email,
         //    },
        //     school: institution,
         //   password: pwd,
        //   });
        //   await storedAdmin.save().catch(console.error);
        setVerified(true);
        createUser();
        // } else {
           //false as admin account already exists
         //  setVerified(false)
        // }
      }
    }

    function checkValidation()
    {
      
      //checks all fields in form to see if they are ready to be verified if not display message to user
      if (institution== "" || institution == "Unlisted")
      {
        setValidationMessage("Please ensure you select an Institution");
      }
      else if (pwd != repwd)
      {
        setValidationMessage("Please ensure your password and re-password match");
      }
      else if (pwd.length < 10 || ! (/\d/.test(pwd) && (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(pwd)))
      {
        setValidationMessage("Please make sure your password is atleast 10 characters and contains atleast one numerical digit");
      }
      else if (!(/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/).test(email))
      {
        setValidationMessage("Please make sure you have entered a valid email");
      }
      else if (firstname == "" || lastname == "" || email=="" || user == "")
      {
        setValidationMessage("Please make sure you filled all the details");
      }
      else{
       return true;
      }
      return false;

    }

    function generateVerificationCode()
    {
      return Math.floor(100000 + Math.random() * 900000);
     
    }

    function updateForEmail()
    {
      setEmailInputs({email: email, username: user, actualcode: actualcode})
     
      
    }
  
    useEffect(() => {userRef.current.focus();}, [])
    useEffect(() => {setErrMsg('');}, [user,pwd])
    
    const handleSubmit = async (e) => {
      //checks all fields in form to see if they are ready to be verified if not display message to user
      if (institution== "" || institution == "Unlisted")
      {
        setValidationMessage("Please ensure you select an Institution");
      }
      else if (pwd != repwd)
      {
        setValidationMessage("Please ensure your password and re-password match");
      }
      else if (pwd.length < 10 || ! (/\d/.test(pwd) && (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(pwd)))
      {
        setValidationMessage("Please make sure your password is at least 10 characters and contains atleast one numerical digit");
      }
      else if (!(/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/).test(email))
      {
        setValidationMessage("Please make sure you have entered a valid email");
      }
      else if (firstname == "" || lastname == "" || email=="" || user == "")
      {
        setValidationMessage("Please make sure you filled all the details");
      }
      else{
        e.preventDefault();

      {/* gmail service */}
      emailjs.send('service_awsfb8e', 'template_n35f2mi', {email, user, actualcode}, 'jBQKDXy824tIJnH8b') //form.current
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    console.log(user, pwd, institution, firstname, lastname);
    console.log(emailInputs);
    //Debug: displays form data in console
  
    let userData = {username: user, pass: pwd}
    
    setSuccess(true);
    
    setInstitution('');
    setUser('');
    setPwd('');
    //clears form data
    }
  }


    return (
        <>
         
        <div className = " font-Dosis sidebar text-slate-200 dark:text-slate-700 border-slate-200 fixed lg:left-0 p-2 w-[600px] h-[900px] overflow-y-auto text-left bg-slate-900 dark:bg-zinc-200"> {/* bars icon */}
          Welcome to COMPEER. You can sign in on the right, if your institution's admin team has added your account details to PeerApp's system.
          <br></br><br></br>
          To use our services <Link to="/register" className="text-indigo-600">Register here</Link> to create an Admin account!
         </div>
         {/*Code for displaying left box, containing link to sign up page */}
        {/*success variable will determine whether the next page (admin/teacher/student view) will be displayed or if false, display the login page */}

        {success && !verified ? (
           
              <div className= 'font-Dosis dark:bg-zinc-900'>
                
              <div className='max-w-xl mx-auto w-3/12 h-[900px]'>
                <h1 className= 'py-20 text-6xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md'>Verify your COMPEER account</h1> 
                {/*Title for account confirm*/}
                
                <div className= 'bg-indigo-100 ml-20 px-5 mt-32 rounded text-center py-10 border-2 border-indigo-900'>
                  We've sent a verification email to: {email}
                  <br></br><br></br>

                  
                  <input 
                  onChange = {(e) => setInputCode(e.target.value)}
                  value={inputcode}
                  name="inputcode"
                  required 
                  className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="inputcode" type="text" placeholder="inputcode">
                  </input>
                  
                  {checkVerification()}
               
                
                </div>
              </div>   
           </div>         
         
        ): verified ? (
          <>
          <div className= 'dark:bg-zinc-900'>
                
          <div className='max-w-xl mx-auto w-3/12 h-[900px]'>
            <h1 className= 'py-20 text-6xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md'>Success!</h1> 
            {/*Title for account confirm*/}
            <div className= 'bg-indigo-100 ml-20 px-5 mt-32 rounded text-center py-10 border-2 border-indigo-900'>
              Your account has now been verified with the email {email}
              <br></br><br></br>
              <Link to="/" className=" rounded-lg font-Dosis text-slate-900 bg-slate-400 text-center w-[150px] py-3 px-2 ml-1  text-m md:text-l font-semibold hover:bg-slate-300"> Try logging in!</Link>

        
              </div>
              </div>   
           </div>
        
            </>
        
          ) :
        <>

                
      <div className= 'font-Dosis dark:bg-zinc-900'>
        <div className='max-w-xl mx-auto w-full h-[900px]'>
          <h1 className= 'py-14 w-[1000px] text-7xl text-slate-600 font-semibold dark:text-white rounded-md'> Register to COMPEER</h1> 
           {/*Title and form display*/}
  

          <form className="w-full max-w-sm">

          <div className=" w-full ml-32 my-2 px-2 border bg-red-200 text-red-500 text-l">{validationMessage}</div>
          <div className="md:w-0 ml-32">   
          
          Institution
          {/*email*/}
          <div className=" md:flex md:items-center">
            
              <div className="md:w-1/3 mb-10">
              <DropDownSearch setInstitution ={setInstitution}></DropDownSearch>
              </div>
              
              
              <div className="md:w-1/3 mt-10">
            Email
                <input
                  onChange = {(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  required 
                  className=" bg-slate-100 appearance-none border-2 border-slate-200 rounded w-100 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="email" type="text" placeholder="E-mail">
            
                </input>
              </div>
            </div>
            <div className= "mt-2 pl-40">  
          </div> 
          </div>
          {/*first Name*/}
          <div className="md:flex md:items-center mb-6">
              
              <div className="md:w-1/3">
                
              </div>
              <div className="md:w-2/3"> First Name
              <div className = "flex flex-wrap z-50">
             
              </div>
            <input
              ref={userRef} 
              onChange = {(e) => setFirstName(e.target.value)}
             value={firstname}
             name="username"
              required 
            className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="username" type="text" placeholder="First name">
            </input>

            </div>
          </div>
          {/*last Name*/}
          <div className="md:flex md:items-center mb-6">
              
              <div className="md:w-1/3">
                
              </div>
              <div className="md:w-2/3"> Last Name
              <div className = "flex flex-wrap z-50">
             
              </div>
            <input
              ref={userRef} 
              onChange = {(e) => setLastName(e.target.value)}
             value={lastname}
             name="username"
              required 
            className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="username" type="text" placeholder="Last name">
            </input>

            </div>
          </div>
        
            {/*Username input*/}
            <div className="md:flex md:items-center mb-6">
              
              <div className="md:w-1/3">
                
              </div>
              <div className="md:w-2/3"> Username
              <div className = "flex flex-wrap z-50">
             
              </div>
            <input
              ref={userRef} 
              onChange = {(e) => setUser(e.target.value)}
             value={user}
             name="username"
              required 
            className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="username" type="text" placeholder="Username">
            </input>

            </div>
          </div>

          {/*password input*/}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">    
            </div>
          <div className="md:w-2/3"> Password (Must contain 10 characters and numbers)
            <input 
              onChange = {(e) => setPwd(e.target.value)}
              value={pwd}
              required 
              className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="password" type="password" placeholder="Password"> 
            </input>
          </div>
          </div>
           {/*re password input*/}
           <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">    
            </div>
          <div className="md:w-2/3">
            <input 
              onChange = {(e) => setRePwd(e.target.value)}
              value={repwd}
              required 
              className="bg-slate-100 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="password" type="password" placeholder="Re-Password"> 
            </input>
          </div>
          </div>
          
        
        {/*submit button */}
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button onClick= {handleSubmit} type="submit" className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Create Account
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

</>
}

{/*bottom section menu*/}
  <div className= 'py-5 h-[69px] bg-slate-800 dark:bg-zinc-800 text-gray-300'>
        
         <Link to="/" className = 'pr-64 pl-64 first-line:inset-y-0 left-0'>Home</Link>
         <span className = 'pr-64 pl-64 inset-y-0 right-0'>Terms of Service</span>
         <span className = 'pr-64 pl-64 inset-y-0 right-0'>Privacy Policy</span>
         <p className='text-xs mt-2 text-white '>© COMPEER {new Date().getFullYear()}. All rights reserved
        
        </p>
 </div>
</>
    )
}
export default SignUp