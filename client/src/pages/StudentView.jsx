import React, {useEffect, useState} from 'react'
import HeroSection from '../components/HeroSection'
import SideBar from '../components/SideBar';
import SubmitWork from './SubmitWork';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Link, useParams, useLocation} from 'react-router-dom';
import AddAssignment from './AddAssignment';
import LoginCard from '../components/LoginCard';
import Works from '../components/Works'
import ViewFeedback from './ViewFeedback';
import Notifications from './Notifications';
import PeerManager from './PeerManager';
import temporaryModulesData from '../data/temporaryModulesData';
import ApproveFeedback from './ApproveFeedback'

function StudentView({title}) {
  // const [toggle, setToggle] = useState(true);
  // const [isShown, setIsShown] = useState(false);

  let outputData = sessionStorage.getItem('loginSessionData');
  outputData = JSON.parse(outputData);

  const [module, setModuleDetails] = useState({});
  const toggleClass = <SubmitWork/>;
  // console.log(type + "test ");
  const location = useLocation();
  const {nestedPage} = location.state;
  const {moduleTitle} = location.state;
  const modTitle = moduleTitle;

  const params = useParams();
  
  const getModuleDetails = function(id) {
    const moduleArray = Object.values(temporaryModulesData);

    for(let i = 0; i < moduleArray.length; i++) {
        let m = moduleArray[i];

        if(m.moduleId == id) {
            //calcTimeLeft(w.dueDate);
            console.log("MODULE" + m);
            return m;
           
        }
    }
  };

  useEffect(() => {
    const onPageLoad = () => {

        //Debugging
        console.log(params.id);
        setModuleDetails(getModuleDetails(params.id));
        console.log(getModuleDetails(params.id));
         
        // //console.log(userData);
    };

    if(document.readyState === 'complete') {
        onPageLoad();
    } else {
        window.addEventListener('load', onPageLoad);
        return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return(
    <>
    
    <HeroSection prevPageName = "Modules" prevUrl= "/modules"></HeroSection>
 
          <div className = 'font-Dosis bg:white dark:bg-gray-400'>
            <div className='w-full mx-auto h-full'>
              
              <>
                <SideBar moduleTitle={modTitle} moduleId={module.moduleId}> </SideBar>

                {outputData.accountType === "teacherAccount" ? ( // CHANGE TO ONLY APPEAR IF TEACHER !!!!!!!
                 <div className = 
                 "border-2 border-slate-700 rounded-r-md fixed mt-80 h-2/6 items-bottom flex px-5 bg-slate-300">

                  <p className="py-6 px-16 underline underline-offset-8 text-center text-xl mb-1 font-semibold ">Teacher Options </p>
                  <Link to={"/modules/" + module.moduleId} state={{moduleTitle: modTitle, nestedPage: "addassignment"}} className=' fixed left-0 text-gray-300 dark:text-gray-300 p-3 mt-20 ml-4 py-3 bg-slate-800 dark:bg-zinc-700 w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                    <h3 className= " text-center text-lg   font-semibold ">Add Assignment </h3>
                  </Link>

                  <Link to={"/modules/" +module.moduleId} state={{moduleTitle: modTitle, nestedPage: "peermanager"}} className=' fixed left-0 text-gray-300 dark:text-gray-300 p-3 ml-4 mt-36 py-3 bg-slate-800 dark:bg-zinc-700 w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                  <h3 className= " text-center text-lg font-semibold ">Open Assignments to Peers </h3>
                </Link>

                <Link to={"/modules/" + module.moduleId} state={{moduleTitle: modTitle, nestedPage: "approvefeedback"}} className=' fixed left-0 text-gray-300 dark:text-gray-300 p-3 ml-4 mt-52 py-3 bg-slate-800 dark:bg-zinc-700 w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                  <h3 className= " text-center text-lg font-semibold ">Peer Feedback requests </h3>
                </Link>
                </div>

                ):(<></>)}
                
          </>
        </div>
      </div>

      <LoginCard></LoginCard>
      <div className= "font-bold py-4 font-Dosis text-center text-4xl text-slate-400">Module: {modTitle} </div>
      {nestedPage === "notifications" ? (
        <Notifications/>
        ): nestedPage === "viewfeedback" ? (
          <ViewFeedback></ViewFeedback>
        ): nestedPage === "submitwork" ? (
          <Works></Works>
        ): nestedPage === "addassignment" ? (
          <AddAssignment></AddAssignment>
        ): nestedPage === "peermanager" ? (
          <PeerManager></PeerManager>
        ): nestedPage === "approvefeedback"? (
            <ApproveFeedback></ApproveFeedback>
        ): //default
        (  <div className= "ml-80 mr-80 py-32 font-Dosis font-bold text-center text-8xl text-slate-200 border-dashed border-4 rounded border-slate-200">Select a tab on the side bar to view here!  </div>)
        }

        
     
        <Routes> <Route path='/submitwork' element={<SubmitWork />} /></Routes>
        <Routes> <Route path='/addassignment' element={<AddAssignment />} /></Routes>
        {/* adds a route to redirect to submitwork page */}
      </>
    )

    
}
export default StudentView