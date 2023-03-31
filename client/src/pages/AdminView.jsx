import React from 'react'
import Modules from '../pages/Modules'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import LoginCard from '../components/LoginCard';
import { ReactSession } from 'react-client-session'
function AdminView() {

    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);

   
      let session = {
        token: ReactSession.get("token"),
        accType: ReactSession.get("accType"),
        email: ReactSession.get("email"),
        inst: ReactSession.get("inst"),
        uid: ReactSession.get("adminId")
      };

  return (
    <>
      <HeroSection prevPageName = "Login" prevUrl= "/login"></HeroSection>
      <LoginCard></LoginCard>
     
     <div className = 'font-Dosis py-2 dark:bg-zinc-900 h-screen'>
    <h1 className= ' sm:pl-72 pl-2 py-10 text-5xl sm:w-[1200px] w-full text-slate-600 font-semibold dark:text-white rounded-md '> Welcome back to admin view </h1> 
    
            <div className='xl:pr-80 pr-10 xl:pl-80 pl-10 grid sm:grid-cols-2 grid-cols-1 gap-3 '>
            <Link id="manageModules" to="/modules" className='text-2xl inline-block px-2 py-32 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-100 hover:-translate-y-1 transform transition text-center outline outline-slate-300'> Manage Modules </Link>
            <Link id="manageAccounts" to="/manageaccounts" className='text-2xl inline-block px-2 py-32 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-100 hover:-translate-y-1 transform transition text-center outline outline-slate-300'> Manage Student/ Teacher Accounts </Link>
               
            </div>
        </div>
        {/*bottom section menu*/}
    </>
    
  )
}

export default AdminView