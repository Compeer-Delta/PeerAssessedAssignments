import React from 'react';
import ModuleItem from '../components/ModuleItem';
import temporaryModulesData from '../data/temporaryModulesData';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import LoginCard from '../components/LoginCard';
import {ReactSession} from 'react-client-session';


function Modules() {

  const modules =  [
    { modulename: 'Temp Module A',moduleId:"6575", institution: "University of Kent"},
    { modulename: 'Temp Module B',moduleId:"6000",  institution: "University of Kent"},
    { modulename: 'Temp Module C' ,moduleId:"1111",  institution: "University of Kent"},
    { modulename: 'Temp Module D',moduleId:"1234",  institution: "University of Kent"},
    { modulename: 'Temp Module E', moduleId:"1235",  institution: "University of Kent"},
  ];
  //replace later with DB read values, (all for particular institution for admin and specifically assigned modules for students/teachers)

  let session = {
    token: "",
    accType: "",
    email: "",
  };

  session.token = ReactSession.get("token");
  session.accType = ReactSession.get("accType");
  session.email = ReactSession.get("email");

  console.log(session);

  //if admin account we display ALL modules for the institution
  //if staff/student we display only assigned modules
  const [isAdmin, setIsAdmin] = useState(() => checkIfAdmin());

  function checkIfAdmin()
  {
    if (session.accountType == "adminAccount") { return true;}
    else {return false;}
  }

  return (
<>

{isAdmin ? (
<HeroSection prevPageName = "Admin view" prevUrl = "/adminview"></HeroSection>
):(<HeroSection prevPageName = "login" prevUrl = "/login"></HeroSection>)}

    <LoginCard></LoginCard>
    <div className = 'py-2 dark:bg-zinc-900 h-screen'>
    <h1 className= ' font-Dosis pl-72 py-10 text-5xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md '> Your Modules...</h1> 
    <h1>{session.accountType}</h1>
            <div className='pr-80 pl-80 grid grid-cols-3 gap-3 '>
              {isAdmin ? (
                  <Link to="/CreateModule" rel="noreferrer"  className='bg-slate-500 dark:bg-zinc-300 rounded-lg w-full h-20 overflow-hidden hover:-translate-y-1 transform transition '>
                      <div className='text-gray-100 dark:text-gray-800 p-3'>
                        <h3 className ='text-lg md:text-xl mb-2 md:mb-1 font-semibold text-center py-3 '>+ New Module</h3>
                         
                    </div>
                 </Link>
                 
                ):(<></>)}

                {modules.map(module => (
                    <ModuleItem key={module.modulename} //key is temporarily title
                              title={module.modulename}
                              modId={module.moduleId}>
  
                    </ModuleItem>
                ))}

                 

                
            </div>
        </div>
        {/*bottom section menu*/}
<div className= ' py-5 h-[69px] bg-slate-800 dark:bg-zinc-800 text-gray-300'>
        
        <Link to="/" className = 'pr-64 pl-64 first-line:inset-y-0 left-0'>Home</Link>
        <span className = 'pr-64 pl-64 inset-y-0 right-0'>Terms of Service</span>
        <span className = 'pr-64 pl-64 inset-y-0 right-0'>Privacy Policy</span>
        <p className='text-xs mt-2 text-white '>© COMPEER {new Date().getFullYear()}. All rights reserved
       
       </p>
          </div>
        </>
        
 )
}

  
export default Modules