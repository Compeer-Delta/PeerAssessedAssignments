import React, {useLayoutEffect, useState} from 'react'
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
import ApproveFeedback from './ApproveFeedback';
import { ReactSession } from 'react-client-session';

function StudentView({title}) {
  // const [toggle, setToggle] = useState(true);
  // const [isShown, setIsShown] = useState(false);

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid")
  };

  const [minimizedTO, setMinimizedTO] = useState(false);
  const [module, setModuleDetails] = useState({});

  // const toggleClass = <SubmitWork/>;
  // console.log(type + "test ");

  //Setting Module Details (Hathan)
  const location = useLocation();
  const {nestedPage} = location.state;
  const {moduleTitle} = location.state;
  const modTitle = moduleTitle;

  
//////////////////////////////////////////////////////////////////////////////////////////////////////TO CHANGE BACK: 6065 TO module.moduleCode AND "teacherAccount" === "teacherAccount" to ... === session.accountType
  // function toggleMinimizeTO() { //toggle minimize for teacher list
  //   if (minimizedTO == true){setMinimizedTO(false)}
  //   else {setMinimizedTO(true)
  //   }
  // }

  const params = useParams();

  useLayoutEffect(() => {
    const getModuleData = async () => {
      const fr = "http://localhost:8081/module?moduleCode=" + params.id + "&institutionName=" + session.inst; //Fetch Route

      const response = await fetch(fr, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + ReactSession.get("token"),
        },
      });

      const moduleData = await response.json();
      setModuleDetails(moduleData);
    };

    getModuleData();
}, []);

return(
    <div className="dark:bg-zinc-900 h-[1200px]">
    
    <HeroSection prevPageName = "Modules" prevUrl= "/modules"></HeroSection>
 
          <div className = 'font-Dosis bg:white dark:bg-zinc-900'>
            <div className='w-full mx-auto h-full'>
              
              <div className="fixed z-30">
                <SideBar moduleTitle={moduleTitle} moduleId={module.moduleCode}> </SideBar> {/*reverse errors: replace all module.moduleCode with random string e.g. "6065" replace m.moduleId*/}

                {(session.accType === "teacherAccount") && (minimizedTO === false)  ? ( //reverse errors: replace session.accountType with "teacherAccount"

                
                 <div className = 
                 "dark:border-indigo-900 border-2 border-slate-700 rounded-r-md fixed mt-80 h-2/6 items-bottom flex px-5 bg-slate-300 dark:bg-zinc-800 border-l-0">

                <button onClick={toggleMinimizeTO} className = "font-Dosis text-sm absolute top-0 right-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition">
                  <p> Minimize </p>
               </button>

                  <p className="dark:bg-zinc-800 py-6 px-16 underline underline-offset-8 text-center text-xl mb-1 font-semibold dark:text-zinc-300">Teacher Options </p>
                  <Link to={"/modules/" + module.moduleCode} state={{moduleTitle: modTitle, nestedPage: "addassignment"}} className='dark:bg-indigo-900 fixed left-0 text-gray-300 p-3 mt-20 ml-4 py-3 bg-slate-800  w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                    <h3 className= " text-center text-lg   font-semibold ">Add Assignment </h3>
                  </Link>

                  <Link to={"/modules/" +module.moduleCode} state={{moduleTitle: modTitle, nestedPage: "peermanager"}} className='dark:bg-indigo-900 fixed left-0 text-gray-300  p-3 ml-4 mt-36 py-3 bg-slate-800  w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                  <h3 className= " text-center text-lg font-semibold ">Open Assignments to Peers </h3>
                </Link>

                <Link to={"/modules/" + module.moduleCode} state={{moduleTitle: modTitle, nestedPage: "approvefeedback"}} className='dark:bg-indigo-900 fixed left-0 text-gray-300 p-3 ml-4 mt-52 py-3 bg-slate-800  w-64 overflow-hidden hover:-translate-y-1 transform transition '>
                  <h3 className= " text-center text-lg font-semibold ">Peer Feedback requests </h3>
                </Link>
                </div>

                ): (session.accType === "teacherAccount") && (minimizedTO === true)  ? (//CHANGE TO session.account
                <button onClick={toggleMinimizeTO} className = "dark:border-indigo-900 border-2 border-slate-700 rounded-r-md fixed mt-80 h-[320px] w-[60px] flex px-1 bg-slate-700 dark:bg-zinc-800 border-l-0">
               <p className="dark:bg-zinc-800 py-24 text-left text-md font-semibold text-gray-100">View Teacher Options </p>
               </button>
               
                ):
                (<></>)} 
                
          </div>
        </div>
      </div>

      <LoginCard></LoginCard>
      <div className= "dark:bg-zinc-900 font-bold py-4 font-Dosis text-center text-4xl text-slate-400 dark:text-indigo-700">Module: {moduleTitle} </div>
      {nestedPage === "notifications" ? (
        <Notifications/>
        ): nestedPage === "viewfeedback" ? (
          <ViewFeedback></ViewFeedback>
        ): nestedPage === "submitwork" ? (
          <Works mod = {module}></Works>
        ): nestedPage === "addassignment" ? (
          <AddAssignment></AddAssignment>
        ): nestedPage === "peermanager" ? (
          <PeerManager></PeerManager>
        ): nestedPage === "approvefeedback"? (
            <ApproveFeedback></ApproveFeedback>
        ): //default
        (  <div className= "dark:bg-zinc-900 sm:ml-80 sm:mr-80 ml-16 mr-16 sm:py-32 py-40 font-Dosis font-bold text-center text-4xl sm:text-8xl text-slate-200 dark:text-indigo-900  border-dashed border-4 rounded dark:border-indigo-900 border-slate-200">Select a tab on the side bar to view here!  </div>)
        }

        
     
        <Routes> <Route path='/submitwork' element={<SubmitWork />} /></Routes>
        <Routes> <Route path='/addassignment' element={<AddAssignment />} /></Routes>
        {/* adds a route to redirect to submitwork page */}
      </div>
    )

    
}
export default StudentView