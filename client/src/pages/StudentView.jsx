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

    return(
        <>
 <HeroSection></HeroSection>
 
          <div className = 'font-Dosis bg:white dark:bg-gray-400'>
            <div className='max-w-5xl mx-auto w-11/12'>
              
              <>
                <SideBar key={title}> </SideBar>

                {false === false ? ( // CHANGE TO ONLY APPEAR IF TEACHER !!!!!!!
                  <Link to= "/addassignment" className='sidebar fixed lg:left-0 text-gray-300 dark:text-gray-300 p-3 my-64  ml-2 py-6 bg-slate-800 dark:bg-zinc-700 w-72 h-20 overflow-hidden hover:-translate-y-1 transform transition '>
                    <h3 className= " text-center text-lg md:text-xl mb-2 md:mb-1 font-semibold ">Add Assignment </h3>
                  </Link>
                ):(<></>)}
                
              </>
            </div>
        </div>
        <Routes> <Route path='/submitwork' element={<SubmitWork />} /></Routes>
        <Routes> <Route path='/addassignment' element={<AddAssignment />} /></Routes>
        {/* adds a route to redirect to submitwork page */}
      </>
    )

    
}
export default StudentView