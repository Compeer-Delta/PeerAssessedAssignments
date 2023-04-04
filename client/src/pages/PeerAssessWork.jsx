import React from 'react'
import HeroSection from '../components/HeroSection'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import { useState } from 'react'
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';

import {Viewer,  Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import { useLocation } from 'react-router-dom'

import '@react-pdf-viewer/core/lib/styles/index.css' //pdf styling
function PeerAssessWork() {

  const location = useLocation();
  const {assignmentTitle} = location.state;
  const {assignmentId} = location.state;  
  const {modId} = location.state; //module id
  const {modTitle} = location.state;
  const {modCode} = location.state;
  const {submitBy} = location.state;
  const [minimized, setMinimized] = useState(false);

    const [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);


    const [givenMark, setGivenMark] = useState(null);
    const [givenFeedback, setGivenFeedback] = useState(null);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    //------------------------------------------------------------------

    const [displayDeleteConfirmation, setDisplayDeleteConfirmation] = useState(false);

  
   const newplugin = defaultLayoutPlugin()

   //BEFORE LOADING PAGE, CHECK IN DB WHETHER A POST WAS MADE TO THE POST ID AND LOGGED USER ID
   //IF YES THEN FILL IN THE USESTATE VALUES, ELSE KEEP USESTATE VALUES TO THEIR DEFAULT
   function submitFeedback()
   {
    setFeedbackSubmitted(true);
   }

   function confirmDelete()
   {

   }

   function deletePost()
   {
    setFeedbackSubmitted(false);
    setGivenMark('');
    setGivenFeedback('');
      
    // remove from database
   }

   function toggleMinimize()
   {
    if (minimized === true){ setMinimized(false)}
    else {setMinimized(true)}
   }

  return (
    <>
    
 <HeroSection prevPageName = "Submissions" prevUrl= {"/modules/"+ modCode + "/viewsubmissions/" + assignmentId} moduleTitle= {modTitle} moduleId = {modId} assignmentTitle={assignmentTitle} assignmentId={assignmentId} moduleCode={modCode}  ></HeroSection>
 <h1 className= ' xl:pl-72 pl-3 py-6 text-3xl  text-slate-600 font-semibold dark:text-white bg-slate-100 border-b-2 border-slate-400 font-Dosis'> Peer Assessing: {submitBy}</h1> 
 <div className="flex row-2">
 <div className=" pdf-container xl:w-1/2 w-full h-full ">
<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
    <Viewer fileUrl="/compeerSamplePDF.pdf"/>
</Worker>
</div>


    {/* ADDED COMMENTS / MARKING HERE */}

    {feedbackSubmitted === false && minimized === false ? ( 
      <div className=" rounded-l-md fixed xl:w-1/2 w-[400px] right-0 bg-slate-300 border-2 border-slate-400 border-r-0 py-2">
      <button onClick={toggleMinimize} className = "font-Dosis text-sm absolute top-0 left-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition">
             <p> Minimize </p>
    </button>
    <h1 className= 'ml-10 py-4  text-3xl w-[300px] sm:w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> Give your feedback to {submitBy}: </h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[100px] text-slate-600 font-semibold dark:text-white rounded-md '> Mark: </h1> 
      
      <input className=" ml-10 border w-20 border-blue-400 text-center rounded-md " type="number" min="0" max="1000" step="1" onChange={(e => {setGivenMark(e.target.value)})}></input>
      <h1 className= 'font-Dosis ml-10 text-l w-[100px] text-slate-600 font-semibold dark:text-white rounded-md '> Feedback: </h1> 
      <textarea 
             
            onChange = {(e) => setGivenFeedback(e.target.value)}
             value={givenFeedback}
             name="username"
              required 
              id="message" rows="10" className="ml-10 only:block p-2.5 sm:w-2/3 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your feedback on the assignment submission...">
      </textarea>
      <br></br>
      <button onClick={submitFeedback} className=" ml-10 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
              Post Feedback
              </button>
              </div>
    ): feedbackSubmitted === true && minimized === false ? (
      <div className=" rounded-l-md fixed xl:w-1/2 w-[400px] right-0 bg-slate-300 border-2 border-slate-400 border-r-0 py-2">
    
    <h1 className= 'ml-10 py-4  text-3xl sm:w-[700px] w-[300px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> Thank you for your peer assessing {submitBy}! </h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Given mark / grade: {givenMark}</h1> 
     <div className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md'>Given feedback:</div>
     <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md">{givenFeedback}</p>

     

    </div>
    ): minimized === true ? (
 
     <button onClick={toggleMinimize} className = 'dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 pb-6 h-[100px] w-[60px] text-sm text-left pl-1 text-gray-100 dark:text-gray-300 bg-slate-600 dark:bg-zinc-800'> Peer Assess
 
    </button>
    ):(<></>)
  
    }




</div>
    </>
    
    
  )
}

export default PeerAssessWork