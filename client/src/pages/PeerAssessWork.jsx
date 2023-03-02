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

  return (
    <>
    
 <HeroSection prevPageName = "Submissions" prevUrl= {"/modules/"+ modId + "/viewsubmissions/" + assignmentId} moduleTitle= {modTitle} moduleId = {modId} assignmentTitle={assignmentTitle} assignmentId={assignmentId} ></HeroSection>
 <h1 className= ' pl-72 py-6 text-3xl  text-slate-600 font-semibold dark:text-white bg-slate-100 border-b-2 border-slate-400 font-Dosis'> Peer Assessing: Hathan Khatkar</h1> 
 <div className="flex row-2">
 <div className=" pdf-container w-1/2 h-full ">
<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
    <Viewer fileUrl="/compeerSamplePDF.pdf"/>
</Worker>
</div>
<div className="rounded-l-md fixed w-1/2 right-0 bg-slate-300 border-2 border-slate-400 border-r-0 py-2">

    {/* ADDED COMMENTS / MARKING HERE */}

    {feedbackSubmitted === false ? ( 
      <>
    <h1 className= 'ml-10 py-4  text-3xl w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> Give your feedback to Hathan: </h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Mark / Grade: </h1> 
      <input
             
            onChange = {(e) => setGivenMark(e.target.value)}
             value={givenMark}
             name="Mark / Grade"
              required 
            className="ml-10 bg-slate-100 appearance-none border-2 border-slate-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="username" type="text" placeholder="Enter your given peer assessed grade">
      </input>
      <h1 className= 'font-Dosis ml-10 text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Feedback: </h1> 
      <textarea
             
            onChange = {(e) => setGivenFeedback(e.target.value)}
             value={givenFeedback}
             name="username"
              required 
              id="message" rows="10" className="ml-10 only:block p-2.5 w-11/12 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your feedback on the assignment submission...">
      </textarea>

      <button onClick={submitFeedback} className=" ml-10 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
              Post Feedback
              </button>
              </>
    ):(<>
    
    <h1 className= 'ml-10 py-4  text-3xl w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> Thank you for your peer assessing Hathan! </h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Given mark / grade: {givenMark}</h1> 
     <div className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md'>Given feedback:</div>
     <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md">{givenFeedback}</p>

    <button onClick={submitFeedback} className=" ml-2 shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-8 rounded ">Edit </button>
    <button onClick={submitFeedback} className=" ml-2 shadow bg-red-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-8 rounded ">Delete </button>  

    </>)}

</div>
</div>
    </>
    
    
  )
}

export default PeerAssessWork