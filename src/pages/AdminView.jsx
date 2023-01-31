import React from 'react'
import Modules from '../pages/Modules'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
function AdminView() {

    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);
  return (
    <>
      <HeroSection></HeroSection>
   
     
     <div className = 'py-2 dark:bg-zinc-900 h-screen'>
    <h1 className= ' pl-72 py-10 text-5xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md '> Welcome back {outputData.username}!</h1> 
    
            <div className='pr-80 pl-80 grid grid-cols-2 gap-3 '>
            <Link to="/modules" className='inline-block px-2 py-32 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-100 hover:-translate-y-1 transform transition text-lg text-center outline outline-slate-300'> Manage Modules </Link>
            <Link to="/manageaccounts" className='inline-block px-2 py-32 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-100 hover:-translate-y-1 transform transition text-lg text-center outline outline-slate-300'> Manage Student/ Teacher Accounts </Link>
               
            </div>
        </div>
        {/*bottom section menu*/}
    </>
    
  )
}

export default AdminView