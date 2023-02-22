import React, {useEffect, useState} from 'react'
import HeroSection from '../components/HeroSection'
import SideBar from '../components/SideBar';
import SubmitWork from './SubmitWork';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Link, useParams, useLocation} from 'react-router-dom';
import AddAssignment from './AddAssignment';

function StudentView({title}) {
    const [toggle, setToggle] = useState(true);
    const [isShown, setIsShown] = useState(false);

    const toggleClass = <SubmitWork/>;

   // const {type}  = useParams();
  //  const stateParamVal = useLocation().state.stateParam

 // console.log(type + "test ");

    function logout()
    {

    }

    return(
        <>
 <HeroSection prevPageName = "Modules" prevUrl= "/modules"></HeroSection>
 
          <div className = 'font-Dosis bg:white dark:bg-gray-400'>
            <div className='max-w-5xl mx-auto w-11/12'>
              
              <>
                <SideBar key={title}> </SideBar>

                {false === false ? ( // CHANGE TO ONLY APPEAR IF TEACHER !!!!!!!
                  <Link to= "/addassignment" className='sidebar fixed lg:left-0 text-gray-300 dark:text-gray-300 p-3 my-80 ml-2 py-6 bg-slate-800 dark:bg-zinc-700 w-72 h-20 overflow-hidden hover:-translate-y-1 transform transition '>
                    <h3 className= " text-center text-lg md:text-xl mb-2 md:mb-1 font-semibold ">Add Assignment </h3>
                  </Link>
                ):(<></>)}
                
              </>
            </div>
        </div>

        {/* Login tab */}
        <h1 className = 'mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed lg:right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> Logged in as Hathan Khatkar
                    <div className = 
                            "p-1 mt-3 flex items-center  text-center px-5 cursor-pointer text-slate-100 dark:text-gray-300 bg-red-600 dark:bg-zinc-900 hover:bg-red-300 transform transition">
                                <p> <button OnClick={logout}>Logout</button></p>
         
                     </div> 
                 </h1>

        <Routes> <Route path='/submitwork' element={<SubmitWork />} /></Routes>
        <Routes> <Route path='/addassignment' element={<AddAssignment />} /></Routes>
        {/* adds a route to redirect to submitwork page */}
      </>
    )

    
}
export default StudentView